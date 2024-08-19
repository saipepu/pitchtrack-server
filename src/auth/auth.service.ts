import { BadRequestException, Injectable } from '@nestjs/common';
import { OrganizerService } from 'src/organizer/organizer.service';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/signIn.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organizer } from 'src/organizer/schema/organizer.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Organizer.name)
    private organizer: mongoose.Model<Organizer>,
    private organizerService: OrganizerService
  ) {}

  // signup
  async signUp(body: any) {

    try {
      const { password } = body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newOrganizer = await this.organizerService.create({
        ...body, hashedPassword: hashedPassword
      });

      return newOrganizer;

    } catch(error) {
      
      throw new BadRequestException({ success: false, error: "Fail to Sign Up as New Organizer."})
    }

  }


  // signin
  async signIn(body: signInDto) {
    
    try {
      const { email, password } = body;

      const organizer = await this.organizer.findOne({ email: email }); 

      if (!organizer) {
        return { success: false, message: "Organizer not found."}
      }

      const isMatch = await bcrypt.compare(password, organizer.hashedPassword);

      if (!isMatch) {
        return { success: false, message: "Invalid password."}
      }

      // -------------------- TODO -------------------- //
      // to generate token using jwt
      // let token = -----
      // -------------------- TASK -------------------- //

      return { success: true, message: "Sign In as Organzier Successful."}

    } catch (error) {

      throw new BadRequestException({ success: false, error: "Fail to Sign In as Organizer."})

    }
  }

}
