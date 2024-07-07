
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop({ required: true, default: 'Untitle' })
  title: string;

  @Prop({ required: true, type: Date, default: Date.now })
  startTime: Date;

  @Prop({ required: true, type: Number, default: 0 })
  duration: Number;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);