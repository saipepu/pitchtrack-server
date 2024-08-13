import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./schema/organizer.schema";
import mongoose, { Model } from "mongoose";
import { Query } from 'express-serve-static-core'
import { createOrganzierDto } from "./dto/createOrganizer.dto";

@Injectable()
export class OrganizerService {
  constructor(
    @InjectModel(Organizer.name)
    private organizer: mongoose.Model<Organizer>,
  ) {}

  // Get All Organizers
  async findAll({ query }: { query?: Query }) {

    const organizers = await this.organizer.find(query).populate('events');

    return { success: true, message: organizers}
  }

  // Get Organizer By Id
  async findById(id: string) {
    const organizer = await this.organizer.findById(id).populate('events');

    return { success: true, message: organizer}
  }

  // Get Organizer By Email
  async findByEmail(email: string) {
    try {

      const organizer = await this.organizer.findOne({ email: email }).populate('events');

      if(!organizer) {
        return { success: false, message: "Organizer not found."}
      }
      
      return { success: true, message: organizer}

    } catch(error) {

      return { success: false, message: "Organizer not found."}

    }
  }

  // Create Organizer
  async createOrganizer(organizer: createOrganzierDto) {

    try {

      const organizerExist = await this.organizer.findOne({ email: organizer.email });

      if (organizerExist) {
        return { success: false, message: "Organizer already exist"}
      }

      const newOrganizer = await this.organizer.create(organizer);
  
      return { success: true, message: newOrganizer}

    } catch (error) {

      throw new BadRequestException({ success: false, error: "Fail to create new organizer."})

    }
  }

  // Update Organizer
  async updateOrganizer(id: string, organizer: createOrganzierDto) {
   
    try {
        
        const updatedOrganizer = await this.organizer.findByIdAndUpdate(id, organizer, {
          new: true,
          runValidators: true,
        });

        return { success: true, message: updatedOrganizer}

    } catch (error) {
        
          throw new BadRequestException({ success: false, error: "Fail to update organizer."})
  
    }
  }

  // Delete Organizer
  async deleteOrganizer(id: string) {
    try {

      await this.organizer.findByIdAndDelete(id);

      return { success: true, message: "Organizer deleted successfully."}

    } catch (error) {
      throw new BadRequestException({ success: false, error: "Fail to delete organizer."})
    }
  }

}