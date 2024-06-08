import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organizer } from './organizer/organizer.schema';
import mongoose from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Organizer.name)
    private organizerModel: mongoose.Model<Organizer>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getOrganizers() {
    return await this.organizerModel.find();
  }
}
