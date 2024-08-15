
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { SlotService } from 'src/slots/slots.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private EventModel: Model<Event>,
    private readonly SlotsService: SlotService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.EventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.EventModel.find().populate('slots').exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.EventModel.findById(id).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.EventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
  }

  async addSlot(id: string, slotData: CreateSlotDto): Promise<Event> {
    const slot = await this.SlotsService.create(slotData);

    const events = await this.EventModel.findByIdAndUpdate(
      id,
      { $push: { slots: slot }},
      { new: true }
    ).exec();

    return events;
  }

  async delete(id: string): Promise<Event> {
    return this.EventModel.findByIdAndDelete(id).exec();
  }

  async deleteall() {
    return this.EventModel.deleteMany().exec();
  }
}
