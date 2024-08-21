
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Appearance, StartTimeType } from '../enums/slot.enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional } from 'class-validator';

// @Schema()
// export class Slot {
//   @ApiProperty({ example: "Slot1" })
//   @Prop({ required: true })
//   title: string;

//   @ApiProperty({ example: "Speaker1" })
//   @Prop({ required: true })
//   speaker: string;

//   @ApiProperty({ example: "Note1" })
//   @Prop({ required: true })
//   notes: string;

//   @ApiProperty({ 
//     example: Appearance.COUNTDOWN,
//     enum: Appearance
//   })
//   @Prop({ required: true })
//   appearance: Appearance;

//   @ApiProperty({ 
//     example: StartTimeType.MANUAL,
//     enum: StartTimeType
//   })
//   @Prop({ required: true })
//   startTimeType: StartTimeType;

//   @ApiProperty({ 
//     example: "2024-08-15T12:40:40.000+07:00",
//     format: "yyyy-mm-ddThh:mm:ss.000+07:00"
//   })
//   @Prop({ required: true })
//   startTime: Date;

//   @ApiProperty({ 
//     example: "23:50:00",
//     format: "hh:mm:ss"
//   })
//   @Prop({ required: true })
//   duration: string;
// }

@Schema()
export class Slot {

  @ApiProperty({ example:  'timeslot' })
  @Prop({ required: true, default: 'timeslot' })
  tag: string;

  @ApiProperty({ example: 'Slot1' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'Speaker1' })
  @Prop({ required: true })
  speaker: string;

  @ApiProperty({ example: 'Note1' })
  @Prop({ required: true })
  notes: string;

  @ApiProperty({ example: Appearance.COUNTDOWN })
  @Prop({ required: true })
  appearance: Appearance;

  @ApiProperty({ example: StartTimeType.MANUAL })
  @Prop({ required: true })
  startTimeType: StartTimeType;

  @ApiProperty({
    example: '2024-08-15T12:40:40.000+07:00',
    format: "yyyy-mm-ddThh:mm:ss.000+07:00"
  })
  @Prop({ required: true })
  startTime: Date;

  @ApiProperty({ example: '123123' }) // total seconds
  @Prop({ required: true })
  duration: string;

  @ApiProperty({ example: '11233' }) // total seconds
  @Prop({ required: true })
  pauseTime: string;

  @ApiProperty({ example: '10' }) // in seconds
  @Prop({ required: true })
  warningTime: string;

  @ApiProperty({ example: '5' }) // in seconds
  @Prop({ required: true })
  dangerTime: string;

  @ApiProperty({ example: 'yellow' })
  @Prop({ required: true })
  warningColor: string;

  @ApiProperty({ example: 'red' })
  @Prop({ required: true })
  dangerColor: string;

  @ApiProperty({ example: 'warning' })
  @Prop({ required: true })
  warningSound: string;

  @ApiProperty({ example: 'danger' })
  @Prop({ required: true })
  dangerSound: string;

  @ApiProperty({ example: false })
  @Prop({ required: true })
  flash: boolean;

  @ApiProperty({ example: 3 })
  @Prop({ required: true })
  flashCount: number;

  @ApiProperty({ example: 1 })
  @Prop({ required: true })
  sortOrder: number;

  @ApiProperty({ example: 'active' })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ example: false })
  @Prop({ required: true })
  active: boolean;

}

export const SlotSchema = SchemaFactory.createForClass(Slot);


// Example of a slot object
let slot: Slot = {
  tag: 'timeslot',
  title: 'Slot 1',
  speaker: 'Speaker 1',
  notes: 'Some notes',
  startTimeType: StartTimeType.MANUAL,
  startTime: new Date(),
  duration: '120',
  pauseTime: '0',
  appearance: Appearance.COUNTDOWN,
  warningTime: '10',
  dangerTime: '5',
  warningColor: 'yellow',
  dangerColor: 'red',
  warningSound: 'warning',
  dangerSound: 'danger',
  flash: false,
  flashCount: 3,
  sortOrder: 1,
  status: 'active',
  active: false,
}