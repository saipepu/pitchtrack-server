import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizerSchema } from "./schema/organizer.schema";
import { OrganizerController } from "./organizer.controller";
import { OrganizerService } from "./organizer.service";
import { EventService } from "src/events/events.service";
import { EventSchema } from "src/events/schemas/event.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema },
      { name: 'Event', schema: EventSchema }
    ])
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService, EventService],
  exports: [OrganizerService]
})

export class OrganizerModule {}