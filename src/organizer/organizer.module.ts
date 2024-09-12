import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizerSchema } from "./schema/organizer.schema";
import { OrganizerController } from "./organizer.controller";
import { OrganizerService } from "./organizer.service";
import { EventService } from "src/events/events.service";
import { EventSchema } from "src/events/schemas/event.schema";
import { TimerGateway } from "src/timer/timers.gateway";
import { EventsModule } from "src/events/events.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema },
      { name: 'Event', schema: EventSchema }
    ]),
    forwardRef(() => EventsModule),
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService, EventService, TimerGateway],
  exports: [OrganizerService]
})

export class OrganizerModule {}