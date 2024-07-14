
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Appearance, StartTimeType } from '../enums/slot';


export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop({ required: true, default: "Untitle" })
  title: string;

  @Prop({ required: true, type: String, default: "Untitle" })
  speaker: string;

  @Prop({ required: true, type: String, default: "Untitle" })
  notes: string;

  @Prop({ required: true, type: String, enum: Appearance, default: Appearance.Countdown })
  appearance: Appearance;

  @Prop({ required: true, type: String, enum: StartTimeType, default: StartTimeType.Manual })
  startTimeType: StartTimeType;

  @Prop({ required: true, type: Date, default: Date.now })
  startDate: Date;

  @Prop({ required: true, type: String, default: "14:30:30" })
  startTime: string;

  @Prop({ required: true, type: String, default: "10:00" })
  durationTime: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);