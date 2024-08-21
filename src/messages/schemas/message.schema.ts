
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageColor, MessageWeight } from '../enums/message.enums';
import { ApiProperty } from '@nestjs/swagger';

// @Schema()
// export class Message {
//   @ApiProperty({ example: "Message1"})
//   @Prop({ required: true })
//   name: string;

//   @ApiProperty({ example: "true"})
//   @Prop({ required: true, default: true })
//   isCap: boolean;

//   @ApiProperty({ example: MessageColor.GREEN, enum: MessageColor})
//   @Prop({ required: true })
//   color: MessageColor;

//   @ApiProperty({ example: MessageWeight.BOLD, enum: MessageWeight})
//   @Prop({ required: true})
//   weight: MessageWeight;

// }

@Schema()
export class Message {
  @ApiProperty({ example: '1' })
  @Prop({ required: true })
  id: string;

  @ApiProperty({ example: 'Message 1' })
  @Prop({ required: true })
  desc: string;

  @ApiProperty({ example: 'red' })
  @Prop({ required: true })
  color: string;

  @ApiProperty({ example: true })
  @Prop({ required: true })
  isCap: boolean;

  @ApiProperty({ example: false })
  @Prop({ required: true })
  onDisplay: boolean;

  @ApiProperty({ example: 'message' })
  @Prop({ required: true, default: 'message' })
  tag: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Example of a message object
let message1: Message = {
  tag: 'message',
  id: '1',
  desc: 'Message 1',
  color: MessageColor.RED,
  isCap: true,
  onDisplay: false,
}