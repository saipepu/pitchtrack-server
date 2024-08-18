import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { EventSchema } from './schemas/event.schema';
import { SlotService } from 'src/slots/slots.service';
import { SlotSchema } from 'src/slots/schemas/slot.schema';
import { MessagesService } from 'src/messages/messages.service';
import { MessageSchema } from 'src/messages/schemas/message.schema';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]), 
  MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema}]),
  MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema}]),
],
  controllers: [EventController],
  providers: [EventService, SlotService, MessagesService],
})
export class EventsModule {}
