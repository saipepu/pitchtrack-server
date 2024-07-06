
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  slots: []

  @Prop({required: true})
  messages: []
}

export const EventSchema = SchemaFactory.createForClass(Event);