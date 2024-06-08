import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
})
export class Organizer extends Document {
    @Prop({ required: [true, "name is required"] })
    name: string;
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);