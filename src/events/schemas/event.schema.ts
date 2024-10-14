
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Slot } from 'src/slots/schemas/slot.schema';
import { Message } from 'src/messages/schemas/message.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class Event {
  @ApiProperty({ example: "Event1"})
  @Prop({ required: true })
  title: string;

  @ApiPropertyOptional({ type: Slot, isArray: true})
  @Prop({ type: [Slot] })
  slots: Slot[]

  @ApiPropertyOptional({ type: Message, isArray: true})
  @Prop({ type: [Message] })
  messages: Message[]
}

export const EventSchema = SchemaFactory.createForClass(Event);