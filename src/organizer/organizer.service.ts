import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./schema/organizer.schema";
import { Model } from "mongoose";
import { CreateOrganzierDto } from "./dto/create-organizer.dto";
import { UpdateOrgainzerDto } from "./dto/update-organizer.dto";

@Injectable()
export class OrganizerService {
  constructor(@InjectModel(Organizer.name) private OrganizerModel: Model<Organizer>) {}

  async create(createOrganzierDto: CreateOrganzierDto) {
    const createdOrganizer = new this.OrganizerModel(createOrganzierDto);
    return createdOrganizer.save();
  }

  async findAll() {
    const organizers = await this.OrganizerModel.find().populate('events').exec();
    return organizers;
  }

  async findById(id: string) {
    return await this.OrganizerModel.findById(id).populate('events').exec();
  }

  async findByEmail(email: string) {
    return await this.OrganizerModel.findOne({ email: email }).exec();
  }

  async updateOrganizer(id: string, updateOrgainzerDto: UpdateOrgainzerDto) {
    return await this.OrganizerModel.findByIdAndUpdate(id, updateOrgainzerDto, {new: true}).exec();
  }

  async deleteOrganizer(id: string) {
    return await this.OrganizerModel.findByIdAndDelete(id).exec();
  }

  async deleteAll() {
    return this.OrganizerModel.deleteMany().exec();
  }

}