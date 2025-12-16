import { IsDate, IsNumber, IsString, Length } from "class-validator";

export class CreatePetDto {
    @IsString({message: "Name must be a string"})
    @Length(8, 20, {message: "Name must be between 8 and 20 characters"})
    readonly name: string;
    @IsString({message: "Type must be a string"})
    readonly type: string;
    @IsDate({message: "Birth date must be a valid date"})
    readonly birthDate: number;
    @IsNumber({}, {message: "Owner ID must be a number"})
    readonly ownerId: number;
}