import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class loginDto {

  @ApiProperty({ example: 'organizer1@gmail.com', description: 'email' })
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsNotEmpty()
  readonly password: string
}