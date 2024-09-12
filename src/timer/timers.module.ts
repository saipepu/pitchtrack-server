import { forwardRef, Module } from "@nestjs/common";
import { TimerGateway } from "./timers.gateway";
import { EventService } from "src/events/events.service";
import { EventsModule } from "src/events/events.module";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/events/schemas/event.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Event', schema: EventSchema },
        ]),
        forwardRef(() => EventsModule),
    ],
    providers: [TimerGateway, EventService],
    exports: [TimerGateway]
})
export class TimerModule {}