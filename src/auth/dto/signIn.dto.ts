import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class signInDto {

  @ApiProperty({ example: 'sydney@gmail.com', description: 'email' })
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({ example: 'password', description: 'password' })
  @IsNotEmpty()
  readonly password: string
}