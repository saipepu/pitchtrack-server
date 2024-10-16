import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enums/organizer.enums";


export class CreateOrganzierDto {

  @ApiProperty({ example: 'Organizer1' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'organizer1@gmail.com'})
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  
  @ApiProperty({ example: Role.ORGANIZER, enum: Role})
  @IsNotEmpty()
  readonly role: Role;
}