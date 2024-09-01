import { Module } from "@nestjs/common";
import { TimerGateway } from "./timers.gateway";
import { EventService } from "src/events/events.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/events/schemas/event.schema";
import { SlotService } from "src/slots/slots.service";
import { MessagesService } from "src/messages/messages.service";
import { SlotSchema } from "src/slots/schemas/slot.schema";
import { MessageSchema } from "src/messages/schemas/message.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
        MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema }]),
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ],
    providers: [TimerGateway, EventService, SlotService, MessagesService],
})
export class TimerModule {}