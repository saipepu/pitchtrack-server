
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private MessageModel: Model<MessageDocument>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.MessageModel(createMessageDto);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.MessageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    return this.MessageModel.findById(id).exec();
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.MessageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Message> {
    return this.MessageModel.findByIdAndDelete(id).exec();
  }

  async deleteall() {
    return this.MessageModel.deleteMany().exec();
  }
}
