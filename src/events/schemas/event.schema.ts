
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Slot } from '../../slots/schemas/slot.schema'


export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Slot.name }] })
  slots: Slot[]

  @Prop({ type: MongooseSchema.Types.ObjectId, default: null})
  messages: []
}

export const EventSchema = SchemaFactory.createForClass(Event);