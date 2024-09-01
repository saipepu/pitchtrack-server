import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Timer from 'easytimer.js';
import { Body, Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventService } from 'src/events/events.service';

class TimerTracker {
  @IsNotEmpty()
  readonly duration: number;

  @IsNotEmpty()
  readonly slotId: string;

  @IsNotEmpty()
  readonly eventId: string;
}

@Injectable()
@WebSocketGateway({ cors: true })
export class TimerGateway {

  constructor(
    @InjectModel(Event.name) private EventModel: Model<Event>,
    private readonly EventService: EventService
  ) {}

  @WebSocketServer() server: Server;

  private timers: { [clientId: string]: Timer } = {};

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @Body() payload: { eventId: string }
  ) {

    // WE DON'T CARE IF THE CLIENT IS JOINING ANOTHER ROOM
    // BECAUSE WHEN A CLIENT JOINS A ROOM, IT JOIN ACCORDING TO THE EVENT ID OF WEB PAGE URL
    // IN ORDER TO JOIN NEXT ROOM, CLIENT MUST CHANGE THE URL THAT FORCE HIM TO REFRESH THE PAGE
    // WHEN THE PAGE REFRESHED, THE SOCKET SOCKET WILL REFRESH AS WELL, GENERATING NEW SOCKET ID
    // THEREFORE, CASE SUCH AS 1 SOCKET CLIENT IN 2 ROOMS AT THE SAME TIME WILL NEVER HAPPEN
    client.join(payload.eventId);
  }

  @SubscribeMessage('start')
  handleStartTimer(
    @ConnectedSocket() client: Socket,
    @Body() payload: TimerTracker
  ) {

    this.clearTimer(payload.eventId);

    this.EventService.updateSlotStatus(payload.eventId, payload.slotId, 'active')
      .then(() => {
        this.acknowledgeSlotsUpdate(payload.eventId)
      });

    console.log('STARTING', payload.eventId, 'WITH DURATION', payload.duration);
    const timer = new Timer();
    this.timers[payload.eventId] = timer;

    timer.start({ countdown: true, startValues: { seconds: payload.duration } });

    timer.addEventListener('secondsUpdated', () => {
      console.log('TIMER UPDATED', timer.getTotalTimeValues().seconds);
      this.server.to(payload.eventId).emit('timerUpdate',
        {
          remainingTime: timer.getTotalTimeValues().seconds,
          eventId: payload.eventId
        });
    });

    timer.addEventListener('targetAchieved', () => {
      this.server.emit('timerCompleted');
      this.clearTimer(payload.eventId);
    });

  }

  @SubscribeMessage('pause')
  handlePauseTimer(
    @ConnectedSocket() client: Socket,
    @Body() payload: TimerTracker
  ) {

    this.EventService.updateSlotStatus(payload.eventId, payload.slotId, 'pause')
      .then(() => {
        this.acknowledgeSlotsUpdate(payload.eventId)
      });
    const timer = this.timers[payload.eventId];
    if (timer) {
      timer.pause();
    }
    

  }

  @SubscribeMessage('resume')
  handleResumeTimer(
    @ConnectedSocket() client: Socket,
    @Body() payload: TimerTracker
  ) {

    this.EventService.updateSlotStatus(payload.eventId, payload.slotId, 'active')
      .then(() => {
        this.acknowledgeSlotsUpdate(payload.eventId)
      });
    const timer = this.timers[payload.eventId];
    if (timer) {
      timer.start();
    }
    this.acknowledgeSlotsUpdate(payload.eventId);

  }

  private clearTimer(clientId: string) {
    console.log(this.timers);
    const timer = this.timers[clientId];
    if (timer) {
      timer.stop();
      delete this.timers[clientId];
    }
  }

  private async acknowledgeSlotsUpdate(eventId: string) {         // EVERY TIME A SLOT IS UPDATED, WE NEED TO SEND THE UPDATED SLOTS TO ALL CLIENTS
    const event = await this.EventService.findOne(eventId);

    this.server.to(eventId).emit('slotsUpdated', 
      {
        success: true,
        message: event.slots
      }
    );

  }

}
