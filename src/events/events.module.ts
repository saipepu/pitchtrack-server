import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { EventSchema } from './schemas/event.schema';
import { SlotService } from 'src/slots/slots.service';
import { SlotSchema } from 'src/slots/schemas/slot.schema';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]), 
  MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema}]),
],
  controllers: [EventController],
  providers: [EventService, SlotService],
})
export class EventsModule {}
