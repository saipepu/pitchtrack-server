import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Role } from "../enums/organizer.enums";
import { Event } from "src/events/schemas/event.schema";
import { CreateEventDto } from "src/events/dto/create-event.dto";
import { Type } from "class-transformer";


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

  @ApiPropertyOptional({ type: CreateEventDto, isArray: true})
  @ValidateNested({ each: true})
  @Type(() => CreateEventDto)
  readonly events: Event[];
  
}