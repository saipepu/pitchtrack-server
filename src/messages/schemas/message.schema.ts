
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, type: String, default: 'Untitle' })
  name: string;

  @Prop({ required: false, type: Boolean, default: true})
  cap: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);