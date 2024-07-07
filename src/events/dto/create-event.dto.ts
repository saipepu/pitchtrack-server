
import { Slot } from '../../slots/schemas/slot.schema'

export class CreateEventDto {
    readonly name: string;
    readonly slots?: Slot[];
    readonly messages?: string[];
}