import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./organizer.schema";
import mongoose, { Model } from "mongoose";
import { Query } from 'express-serve-static-core'

@Injectable()
export class OrganizerService {
  constructor(
    @InjectModel(Organizer.name)
    private organizerModel: mongoose.Model<Organizer>,
  ) {}

  // Get All Organizers
  async findAll({ query }: { query?: Query }) {

    const organizers = await this.organizerModel.find({ query }).populate('events');

    return { success: true, message: organizers}
  }



}