
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Appearance, StartTimeType } from '../enums/slot';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Slot {
  @ApiProperty({ example: "Slot1" })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: "Speaker1" })
  @Prop({ required: true })
  speaker: string;

  @ApiProperty({ example: "Note1" })
  @Prop({ required: true })
  notes: string;

  @ApiProperty({ 
    example: Appearance.COUNTDOWN,
    enum: Appearance
  })
  @Prop({ required: true })
  appearance: Appearance;

  @ApiProperty({ 
    example: StartTimeType.MANUAL,
    enum: StartTimeType
  })
  @Prop({ required: true })
  startTimeType: StartTimeType;

  @ApiProperty({ 
    example: "2024-08-15T12:40:40.000+07:00",
    format: "yyyy-mm-ddThh:mm:ss.000+07:00"
  })
  @Prop({ required: true })
  startTime: Date;

  @ApiProperty({ 
    example: "23:50:00",
    format: "hh:mm:ss"
  })
  @Prop({ required: true })
  duration: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);