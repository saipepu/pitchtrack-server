import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Timer from 'easytimer.js';
import { Body } from '@nestjs/common';

@WebSocketGateway({ namespace: 'api' })
export class TimerGateway {
  @WebSocketServer() server: Server;
  private timers: { [clientId: string]: Timer } = {};

  @SubscribeMessage('start')
  handleStartTimer(@ConnectedSocket() client: Socket, @Body() payload: { duration: number }) {

    this.clearTimer(client.id);

    const timer = new Timer();
    this.timers[client.id] = timer;

    timer.start({ countdown: true, startValues: { seconds: payload.duration } });

    timer.addEventListener('secondsUpdated', () => {
      this.server.emit('timerUpdate', { remainingTime: timer.getTotalTimeValues().seconds });
    });

    timer.addEventListener('targetAchieved', () => {
      this.server.emit('timerCompleted');
      this.clearTimer(client.id);
    });
  }

  @SubscribeMessage('pause')
  handlePauseTimer(@ConnectedSocket() client: Socket) {
    const timer = this.timers[client.id];
    if (timer) {
      timer.pause();
    }
  }

  @SubscribeMessage('resume')
  handleResumeTimer(@ConnectedSocket() client: Socket) {
    const timer = this.timers[client.id];
    if (timer) {
      timer.start();
    }
  }

  private clearTimer(clientId: string) {
    const timer = this.timers[clientId];
    if (timer) {
      timer.stop();
      delete this.timers[clientId];
    }
  }
}
