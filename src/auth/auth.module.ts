import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerSchema } from 'src/organizer/schema/organizer.schema';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { OrganizerService } from 'src/organizer/organizer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organizer', schema: OrganizerSchema }
    ]),
    OrganizerModule
  ],
  controllers: [AuthController],
  providers: [AuthService, OrganizerService],
  exports: [AuthService],
})
export class AuthModule {}
