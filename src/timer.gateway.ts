import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

enum ACTION {
    PAUSE = "PAUSE",
    RESUME = "RESUME"
}

interface Timer {
    stoppedTime: number;
    action: ACTION
}

@WebSocketGateway({ cors: true })
export class TimerGateWay {

    @WebSocketServer()
    server;

    saved = 0;

    @SubscribeMessage('pause')
    handleMessage(
        @MessageBody()
        message: Timer
    ): void {
        console.log(message);
        this.saved = message.stoppedTime;
        this.server.emit('pause', message.action + ' socket')
    }

    @SubscribeMessage('resume')
    handleResume(
        @MessageBody()
        message: Timer
    ): void {
        
        this.server.emit('resume', message.action + ' time to start by ' + this.saved )
    }

}