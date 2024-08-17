
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageColor, MessageWeight } from '../enums/message.enums';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Message {
  @ApiProperty({ example: "Message1"})
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: "true"})
  @Prop({ required: true, default: true })
  isCap: boolean;

  @ApiProperty({ example: MessageColor.GREEN, enum: MessageColor})
  @Prop({ required: true })
  color: MessageColor;

  @ApiProperty({ example: MessageWeight.BOLD, enum: MessageWeight})
  @Prop({ required: true})
  weight: MessageWeight;

}

export const MessageSchema = SchemaFactory.createForClass(Message);