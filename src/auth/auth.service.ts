import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrganizerService } from 'src/organizer/organizer.service';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private organizerService: OrganizerService,
    private jwtService: JwtService
  ) {}

  async register(user: any) {

    // --------------------------------
    // TODO: CHECK IF THE USER ALREADY EXISTS
    // --------------------------------

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newOrganizer = await this.organizerService.create({
      ...user, password: hashedPassword
    });

    return newOrganizer;
  }

  async login(payload: loginDto): Promise<{ accessToken: string }> {
    const user = await this.organizerService.findByEmail(payload.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(payload.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({ email: user.email, sub: user.id });

    return { accessToken };
  }
}
