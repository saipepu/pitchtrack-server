
import { IsEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Slot } from '../../slots/schemas/slot.schema'
import { Message } from 'src/messages/schemas/message.schema';

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ValidateNested()
    @IsEmpty()
    readonly slots: Slot[];

    @ValidateNested()
    @IsEmpty()
    readonly messages: Message[];
}