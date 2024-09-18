import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotSchema } from './schemas/slot.schema';
// import { SlotController } from './slots.controller';
import { SlotService } from './slots.service';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema }])],
  controllers: [],
  providers: [SlotService,
    // I THINK ALL THIS PROVIDERS SHOULD BE IN THE APP MODULE
    // CUZ THEY ARE GLOBAL ANYWAY RIGHT?
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
  exports: [SlotService]
})
export class SlotsModule {}
