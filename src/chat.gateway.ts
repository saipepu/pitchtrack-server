import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

interface Message {
    data: string
}

// @WebSocketGateway(80, { namespace: 'chat'})
@WebSocketGateway({ cors: true })
export class ChatGateway {

    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(
        @MessageBody()
        message: Message
    ): void {
        console.log(message);
        this.server.emit('message', message.data + "from socket server");
    }
}