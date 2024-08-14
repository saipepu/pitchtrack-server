
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Slot } from 'src/slots/schemas/slot.schema';
import { Message } from 'src/messages/schemas/message.schema';

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Slot.name }] })
  slots: Slot[]

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Message.name }] })
  messages: Message[]
}

export const EventSchema = SchemaFactory.createForClass(Event);