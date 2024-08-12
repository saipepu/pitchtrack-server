import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { OrganizerSchema } from "./schema/organizer.schema";
import { OrganizerController } from "./organizer.controller";
import { OrganizerService } from "./organizer.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema }
    ])
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [OrganizerService]
})

export class OrganizerModule {}