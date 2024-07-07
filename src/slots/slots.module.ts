import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotSchema } from './schemas/slot.schema';
import { SlotController } from './slots.controller';
import { SlotService } from './slots.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema }])],
  controllers: [SlotController],
  providers: [SlotService]
})
export class SlotsModule {}
