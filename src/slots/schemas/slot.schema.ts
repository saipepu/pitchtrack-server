
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Appearance, StartTimeType } from 'src/enums/slot';


export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop({ required: true, default: 'Untitle' })
  title: string;

  @Prop({ required: true, default: 'Untitle' })
  speaker: string;

  @Prop({ required: true, default: 'Untitle' })
  notes: string;

  @Prop({ type: String, enum: Appearance,  required: true, default: Appearance.Countdown })
  appearance: Appearance;

  @Prop({ type: String, enum: StartTimeType,  required: true, default: StartTimeType.Manual })
  startTimeType: StartTimeType;

  @Prop({ required: true, type: Date, default: Date.now })
  startDate: String;

  @Prop({ required: true, type: String })
  startTime: String;

  @Prop({ required: true, type: String })
  durationTime: String;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);