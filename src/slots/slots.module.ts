import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotSchema } from './schemas/slot.schema';
import { SlotController } from './slots.controller';
import { SlotService } from './slots.service';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema }])],
  controllers: [SlotController],
  providers: [SlotService,
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }
]
})
export class SlotsModule {}
