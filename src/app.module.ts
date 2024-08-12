import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerSchema } from './organizer/schema/organizer.schema';
import { ChatGateway } from './chat.gateway';
import { TimerGateWay } from './timer.gateway';
import { EventsModule } from './events/events.module';
import { SlotsModule } from './slots/slots.module';
import { MessagesModule } from './messages/messages.module';
import { OrganizerModule } from './organizer/organizer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema },
    ]),
    OrganizerModule,
    EventsModule,
    SlotsModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, TimerGateWay],
})
export class AppModule {}
