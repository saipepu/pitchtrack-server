
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Slot } from '../../slots/schemas/slot.schema'
import { Message } from 'src/messages/schemas/message.schema';
import { Type } from 'class-transformer';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({ example: "Event1"})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiPropertyOptional({ type: CreateSlotDto, isArray: true})
    @ValidateNested({ each: true })
    @Type(() => CreateSlotDto)
    readonly slots: Slot[];

    @ApiPropertyOptional({ type: CreateMessageDto, isArray: true})
    @ValidateNested({ each: true})
    @Type(() => CreateMessageDto)
    readonly messages: Message[];
}