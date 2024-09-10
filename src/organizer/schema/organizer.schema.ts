import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { Role } from "../enums/organizer.enums";
import { Event } from "src/events/schemas/event.schema";

@Schema({
  timestamps: true,
})
export class Organizer extends Document {
  @ApiProperty({ example: 'Organizer1' })
  @Prop({ required: true})
  name: string;

  @ApiProperty({ example: 'organizer1@gmail.com'})
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: Role.ORGANIZER, enum: Role })
  @Prop({ required: true})
  role: Role;

  @ApiProperty({ example: 'array of eventId', description: 'Event ID' })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Event" })
  events: Event[];
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);