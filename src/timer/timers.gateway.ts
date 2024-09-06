import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Timer from 'easytimer.js';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsNotEmpty} from 'class-validator';

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

  private timers: { [eventId: string]: CurrentTimer } = {};

  constructor() {}

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.removeClientFromRooms(client);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Event
  ) {
    client.join(payload.eventId);
    this.addClientToRoom(client.id, payload.eventId);
    this.broadcastClientsInRoom(payload.eventId);
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
      slotId: payload.slotId
    };
    
    timer.start({ countdown: true, startValues: { seconds: payload.duration } });

    timer.addEventListener('secondsUpdated', () => {
      this.server.to(payload.eventId).emit('timerUpdate',
        {
          remainingTime: timer.getTotalTimeValues().seconds,
          eventId: payload.eventId,
          slotId: payload.slotId
        });
    });

    // timer.addEventListener('targetAchieved', () => { 
    //   this.server.to(payload.eventId).emit('timerCompleted');
    //   this.clearTimer(payload.eventId);
    // });

  }

  @SubscribeMessage('pause')
  handlePauseTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerTracker
  ) {

    const currentTimer = this.timers[payload.eventId];
    if (currentTimer) {
      currentTimer.timer.pause();
    }
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

  // async acknowledgeSlotsUpdate(eventId: string) {         // EVERY TIME A SLOT IS UPDATED, WE NEED TO SEND THE UPDATED SLOTS TO ALL CLIENTS
  //   const event = await this.EventService.findOne(eventId);

  //   this.server.to(eventId).emit('slotsUpdated', 
  //     {
  //       success: true,
  //       message: event.slots
  //     }
  //   );

  // }

}
