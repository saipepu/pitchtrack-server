import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

enum Role {
  organizer = 'organizer',
  speaker = 'speaker',
}
@Schema({
  timestamps: true,
})
export class Organizer extends Document {
  @ApiProperty({ example: 'Sydny', description: 'Name' })
  @Prop({ required: [true, "name is required"] })
  name: string;

  @ApiProperty({ example: 'JohnDoe@gmail.com', description: 'Email Address' })
  @Prop({ required: [true, "email is required"], unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @Prop({ required: [true, "password is required"] })
  hashedPassword: string;

  @ApiProperty({ example: Role.organizer, description: 'Role' })
  @Prop({ required: [true, "role is required"], default: "speaker" })
  role: Role;

  // eventid list
  @Prop({ type: [String], default: [] })
  events: string[];
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);