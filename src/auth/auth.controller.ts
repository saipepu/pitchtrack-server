import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { signInDto } from './dto/signIn.dto';
import { CreateOrganzierDto } from 'src/organizer/dto/create-organizer.dto';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  // Org Sign Up
  @Post('org/signUp')
  @ApiOperation({ summary: 'Sign Up Url for Organizers' })
  async signIn(
    @Body()
    body: CreateOrganzierDto
  ) {
    return this.authService.signUp(body);
  }

  // Org Sign In
  @Post('org/signIn')
  @ApiOperation({ summary: 'Sign In Url for Organizers' })
  async signUp(
    @Body()
    body: signInDto
  ) {
    return this.authService.signIn(body);
  }
}
