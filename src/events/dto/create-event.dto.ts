
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Slot } from '../../slots/schemas/slot.schema'
import { Message } from 'src/messages/schemas/message.schema';
import { Type } from 'class-transformer';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ValidateNested({ each: true })
    @Type(() => CreateSlotDto)
    readonly slots: Slot[];

    @ValidateNested()
    @Type(() => CreateMessageDto)
    readonly messages: Message[];
}