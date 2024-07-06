import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerSchema } from './organizer/organizer.schema';
import { ChatGateway } from './chat.gateway';
import { TimerGateWay } from './timer.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forRoot("mongodb+srv://user:AgbeA4N2lkcyBdKS@cluster.ctv8fgc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"), 
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema },
    ]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, TimerGateWay],
})
export class AppModule {}
