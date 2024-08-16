
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slot } from './schemas/slot.schema';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Injectable()
export class SlotService {
  constructor(@InjectModel(Slot.name) private SlotModel: Model<Slot>) {}

  async create(createSlotDto: CreateSlotDto): Promise<Slot> {
    return new this.SlotModel(createSlotDto).save();
  }

  async findAll(): Promise<Slot[]> {
    return this.SlotModel.find().exec();
  }

  async findOne(id: string): Promise<Slot> {
    try {
      const model = await this.SlotModel.findById(id).exec()
      return model;

    } catch (error) {
      throw new NotFoundException(`Model with ID ${id} not found`)
    }
  }

  async update(id: string, updateSlotDto: UpdateSlotDto): Promise<Slot> {
    try {
      return await this.SlotModel.findByIdAndUpdate(id, updateSlotDto, { new: true }).exec();
      
    } catch (error) {
      throw new NotFoundException(`Model with ID ${id} not found`)
    }
  }

  async delete(id: string): Promise<Slot> {
    try {
      return await this.SlotModel.findByIdAndDelete(id).exec();
      
    } catch (error) {
      throw new NotFoundException(`Model with ID ${id} not found`)
    }
  }

  async deleteall() {
    return this.SlotModel.deleteMany().exec();
  }
}
