
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slot, SlotDocument } from './schemas/slot.schema';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Injectable()
export class SlotService {
  constructor(@InjectModel(Slot.name) private SlotModel: Model<SlotDocument>) {}

  async create(createSlotDto: CreateSlotDto): Promise<Slot> {
    const createdSlot = new this.SlotModel(createSlotDto);
    return createdSlot.save();
  }

  async findAll(): Promise<Slot[]> {
    return this.SlotModel.find().exec();
  }

  async findOne(id: string): Promise<Slot> {
    return this.SlotModel.findById(id).exec();
  }

  async update(id: string, updateSlotDto: UpdateSlotDto): Promise<Slot> {
    return this.SlotModel.findByIdAndUpdate(id, updateSlotDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Slot> {
    return this.SlotModel.findByIdAndDelete(id).exec();
  }

  async deleteall() {
    return this.SlotModel.deleteMany().exec();
  }
}
