import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./schema/organizer.schema";
import { Model } from "mongoose";
import { CreateOrganzierDto } from "./dto/create-organizer.dto";
import { UpdateOrgainzerDto } from "./dto/update-organizer.dto";
import { EventService } from "src/events/events.service";
import { Appearance, StartTimeType } from "src/slots/enums/slot.enums";

@Injectable()
export class OrganizerService {
  constructor(
    @InjectModel(Organizer.name) private OrganizerModel: Model<Organizer>,
    private eventService: EventService
  ) {}

  private defaultSlot: any = {
    "tag": "Tag1",
    "title": "Slot1",
    "speaker": "Speaker1",
    "notes": "Note1",
    "appearance": Appearance.COUNTDOWN,
    "startTimeType": StartTimeType.MANUAL,
    "startTime": new Date(),
    "duration": "3500",
    "pauseTime": "3500",
    "warningTime": "35",
    "dangerTime": "5",
    "warningColor": "yellow",
    "dangerColor": "red",
    "dangerSound": "danger",
    "warningSound": "warning",
    "flash": true,
    "flashCount": 3,
    "sortOrder": 0,
    "status": "active",
    "active": false
  };

  async create(createOrganzierDto: CreateOrganzierDto) {
    const createdOrganizer = new this.OrganizerModel(createOrganzierDto);

    const event: any = await this.eventService.create({
      title: 'Event 1',
      slots: [this.defaultSlot],
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
      slots: [this.defaultSlot],
      messages: []
    })

    organizer.events.push(event._id);
    return organizer.save();
  }

}