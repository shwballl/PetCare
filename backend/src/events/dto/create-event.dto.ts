export class CreateEventDto {
    readonly name: string;
    readonly date: Date;
    readonly checked: boolean;
    readonly details: string;
    readonly petId: number;
}

