import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./schema/organizer.schema";
import { Model } from "mongoose";
import { CreateOrganzierDto } from "./dto/create-organizer.dto";
import { UpdateOrgainzerDto } from "./dto/update-organizer.dto";
import { EventService } from "src/events/events.service";

@Injectable()
export class OrganizerService {
  constructor(
    @InjectModel(Organizer.name) private OrganizerModel: Model<Organizer>,
    readonly eventService: EventService
  ) {}

  async create(createOrganzierDto: CreateOrganzierDto) {
    const createdOrganizer = new this.OrganizerModel(createOrganzierDto);

    const event: any = await this.eventService.create({
      title: 'Event created by ' + createdOrganizer.name,
      slots: [],
      messages: []
    })

    createdOrganizer.events.push(event._id);

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

  async createEvent(id: string, payload: any) {
    const organizer = await this.OrganizerModel.findById(id).exec();
    const event: any = await this.eventService.create({
      title: payload.title,
      slots: [],
      messages: []
    })

    organizer.events.push(event._id);
    return organizer.save();
  }

}