export class CreatePetDto {
    readonly name: string;
    readonly type: string;
    readonly birthDate: number;
    readonly ownerId: number;
}