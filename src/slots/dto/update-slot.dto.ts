import { Appearance, StartTimeType } from "../enums/slot";

export class UpdateSlotDto {
    readonly title?: string;
    readonly speaker?: string;
    readonly notes?: string;
    readonly appearance?: Appearance;
    readonly startTimeType?: StartTimeType;
    readonly startDate?: Date;
    readonly startTime?: string;
    readonly durationTime?: string;
}