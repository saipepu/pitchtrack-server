import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Timer, { TimerValues } from 'easytimer.js';
import { forwardRef, Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsNotEmpty} from 'class-validator';
import { EventService } from 'src/events/events.service';

class TimerTracker {
  @IsNotEmpty()
  readonly duration: number;

  @IsNotEmpty()
  readonly eventId: string;

  @IsNotEmpty()
  readonly slotId: string;
}

class Event {
  @IsNotEmpty()
  readonly eventId: string;
}

interface CurrentTimer {
  timer: Timer,
  slotId: string
}

@UsePipes(new ValidationPipe())
@Injectable()
@WebSocketGateway({ cors: true })
export class TimerGateway implements OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Set<string>> = new Map();
  private clientRoom: string = '';

  private timers: { [eventId: string]: CurrentTimer } = {};

  constructor(
    @Inject(forwardRef(() => EventService))
    private EventService: EventService
  ) {}

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.removeClientFromRooms(client);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Event
  ) {

    if(client.rooms.size > 1) {
      client.leave(Array.from(client.rooms)[client.rooms.size - 1])
    }
    client.join(payload.eventId);
    this.clientRoom = payload.eventId;
    this.addClientToRoom(client.id, payload.eventId);
    this.broadcastClientsInRoom(payload.eventId);

    console.log('joined room', payload.eventId);
    let timer = this.timers[payload.eventId]

    // EMITTING THE PREVIOUS TIMER VALUE TO THE NEWLY JOINED CLIENT OR WHEN A CLIENT REFRESHES THE BROWSER AND REJOIN THE ROOM
    // IN CASE THE TIMER IS NOT RUNNING, THE SOCKET HAS TO TELL WHICH TIMER IS OR SLOT WAS PAUSED
    if(timer && !timer.timer.isRunning()) {

      for(let i = 0; i < 3; i++) {

          setTimeout(() => {
            console.log('emitting slotId', timer.slotId)
            this.server.to(payload.eventId).emit('timerUpdate',
              {
                remainingTime: timer.timer.getTotalTimeValues().seconds,
                eventId: payload.eventId,
                slotId: timer.slotId,
                isRunning: false
              });
          }, 1000)

      }

    }
  }

  @SubscribeMessage('start')
  handleStartTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerTracker
  ) {

    this.clearTimer(payload.eventId);

    const timer = new Timer();
    this.timers[payload.eventId] = {
      timer: timer,
      slotId: payload.slotId,
    };
    let runningSlotId = payload.slotId;
    
    timer.start({ countdown: true, startValues: { seconds: payload.duration } });

    timer.addEventListener('secondsUpdated', () => {
      this.server.to(payload.eventId).emit('timerUpdate',
        {
          remainingTime: timer.getTotalTimeValues().seconds,
          eventId: payload.eventId,
          slotId: runningSlotId,
          isRunning: true
        });
    });

    timer.addEventListener('targetAchieved', async () => {
      try {
        let event = await this.EventService.findOne(payload.eventId);
        let slots = event.slots.sort((a, b) => a.sortOrder - b.sortOrder);
        let currentSlotIndex = slots.findIndex(slot => slot._id.toString() === runningSlotId);
        let nextSlot = slots[currentSlotIndex + 1];
        
        if(nextSlot?.startTimeType == 'linked') {
          runningSlotId = nextSlot._id.toString();
          timer.start({ countdown: true, startValues: { seconds: parseInt(nextSlot.duration) } });
        } else {
          this.server.to(payload.eventId).emit('timerCompleted');
          this.clearTimer(payload.eventId);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    });
  }

  @SubscribeMessage('pause')
  handlePauseTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerTracker
  ) {

    console.log('pause', payload.eventId);
    const currentTimer = this.timers[payload.eventId];
    if (currentTimer) {
      currentTimer.timer.pause();
    }

    // NEED TO BROADCAST THE PAUSE EVENT TO ALL CLIENTS IN THE ROOM
    this.server.to(payload.eventId).emit('timerUpdate',
      {
        remainingTime: currentTimer.timer.getTotalTimeValues().seconds,
        eventId: payload.eventId,
        slotId: payload.slotId,
        isRunning: false
      });

  }

  @SubscribeMessage('resume')
  handleResumeTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerTracker
  ) {
    const currentTimer = this.timers[payload.eventId];
    if (currentTimer) {
      currentTimer.timer.start();
    }
  }

  @SubscribeMessage('skip')
  handleSkipTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Event
  ) {
    // skip 10s
    const currentTimer = this.timers[payload.eventId];
    
    if (currentTimer.timer.getTotalTimeValues().seconds > 10) {

      const newStartValues = { seconds: currentTimer.timer.getTotalTimeValues().seconds - 10 };
      currentTimer.timer.stop();

      // Restart the timer with the updated values
      currentTimer.timer.start({ countdown: true, startValues: newStartValues })
    }
  }

  @SubscribeMessage('rewind')
  async handleRewindTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Event
  ) {
    // skip 10s
    const currentTimer = this.timers[payload.eventId];

    let event = await this.EventService.findOne(payload.eventId)

    if(event) {
      let slot = event.slots.find(slot => slot._id.toString() === currentTimer.slotId);

      if(parseInt(slot.duration) > currentTimer.timer.getTotalTimeValues().seconds + 10) {

        const newStartValues = { seconds: currentTimer.timer.getTotalTimeValues().seconds + 10 };
        currentTimer.timer.stop();

        // Restart the timer with the updated values
        currentTimer.timer.start({ countdown: true, startValues: newStartValues })

      }
    }


  }

  private broadcastClientsInRoom(room: string) {
    const clientsInRoom = Array.from(this.connectedClients.get(room) || []);
    this.server.to(room).emit('connectedDevices', clientsInRoom);
  }

  private removeClientFromRooms(client: Socket) {
    this.connectedClients.forEach((clients, room) => {
      if (clients.has(client.id)) {
        clients.delete(client.id);
        this.broadcastClientsInRoom(room);
        if (clients.size === 0) {
          this.connectedClients.delete(room);
        }
      }
    });
  }

  private addClientToRoom(clientId: string, room: string) {
    if (!this.connectedClients.has(room)) {
      this.connectedClients.set(room, new Set());
    }
    this.connectedClients.get(room)?.add(clientId);
  }

  private clearTimer(eventId: string) {
    const currentTimer = this.timers[eventId];

    if (currentTimer) {
      currentTimer.timer.stop();
      delete this.timers[eventId];
    }
  }

  async acknowledgeRoomInfoUpdate(event: any, updatedCategory?: string) {         // EVERY TIME A SLOT IS UPDATED, WE NEED TO SEND THE UPDATED SLOTS TO ALL CLIENTS

    if(event) {
      this.server.to(event._id.toString()).emit('onRoomInfoUpdate', 
        {
          success: true,
          message: event,
          category: updatedCategory
        }
      );
    }

  }

}
