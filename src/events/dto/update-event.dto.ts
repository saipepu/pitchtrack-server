
import { Slot } from '../../slots/schemas/slot.schema'


export class UpdateEventDto {
    readonly name?: string;
    readonly slots?: Slot[];
  }
  