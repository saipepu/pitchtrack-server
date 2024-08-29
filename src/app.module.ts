import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { SlotsModule } from './slots/slots.module';
import { MessagesModule } from './messages/messages.module';
import { OrganizerModule } from './organizer/organizer.module';
import { AuthModule } from './auth/auth.module';
import { TimerModule } from './timer/timers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    OrganizerModule,
    EventsModule,
    SlotsModule,
    MessagesModule,
    AuthModule,
    TimerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
