import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerSchema } from './organizer/organizer.schema';
import { ChatGateway } from './chat.gateway';
import { TimerGateWay } from './timer.gateway';

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
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, TimerGateWay],
})
export class AppModule {}
