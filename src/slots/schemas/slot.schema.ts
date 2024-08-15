
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Appearance, StartTimeType } from '../enums/slot';

@Schema()
export class Slot {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  speaker: string;

  @Prop({ required: true })
  notes: string;

  @Prop({ required: true })
  appearance: Appearance;

  @Prop({ required: true })
  startTimeType: StartTimeType;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  duration: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);