import { forwardRef, Module } from "@nestjs/common";
import { TimerGateway } from "./timers.gateway";
import { EventService } from "src/events/events.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/events/schemas/event.schema";
import { SlotService } from "src/slots/slots.service";
import { MessagesService } from "src/messages/messages.service";
import { SlotSchema } from "src/slots/schemas/slot.schema";
import { MessageSchema } from "src/messages/schemas/message.schema";
import { EventsModule } from "src/events/events.module";
import { SlotsModule } from "src/slots/slots.module";
import { MessagesModule } from "src/messages/messages.module";
import { OrganizerModule } from "src/organizer/organizer.module";
import { OrganizerService } from "src/organizer/organizer.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
        forwardRef(() => EventsModule)
    ],
    providers: [TimerGateway, EventService],
    exports: [TimerGateway]
})
export class TimerModule {}