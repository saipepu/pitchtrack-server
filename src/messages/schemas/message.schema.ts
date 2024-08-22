
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageColor } from '../enums/message.enums';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Message {
  @ApiProperty({ example: 'Message 1' })
  @Prop({ required: true })
  desc: string;

  @ApiProperty({ example: MessageColor.BLACK, enum: MessageColor })
  @Prop({ required: true })
  color: MessageColor.BLACK;

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
  desc: 'Message 1',
  color: MessageColor.BLACK,
  isCap: true,
  onDisplay: false,
}