

export class CreateEventDto {
    readonly name: string;
    readonly slots?: string[];
    readonly messages?: string[];
}