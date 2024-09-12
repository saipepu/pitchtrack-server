import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { EventSchema } from './schemas/event.schema';
import { TimerModule } from 'src/timer/timers.module';
import { TimerGateway } from 'src/timer/timers.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema }
    ]), 
    forwardRef(() => TimerModule),
  ],
  controllers: [EventController],
  providers: [EventService, TimerGateway],
  exports: [EventService],
})
export class EventsModule {}
