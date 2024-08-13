import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { Organizer } from "../schema/organizer.schema";

enum Role {
  organizer = 'ORGANIZER',
  speaker = 'SPEAKER',
}
export class createOrganzierDto {
  // name
  @ApiProperty({ example: 'Sydney', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // email required
  @ApiProperty({ example: 'sydney@gmail.com', description: 'Email Address' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  // password required
  @ApiProperty({ example: 'password', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  // role
  @IsEmpty({ message: 'Role is specified by api route automatically!' })
  readonly role: Role;

  
}