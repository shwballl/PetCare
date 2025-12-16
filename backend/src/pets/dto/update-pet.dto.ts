import { IsString, Length } from "class-validator";

export class UpdatePetDto {
    @IsString({message: "Name must be a string"})
    @Length(8, 20, {message: "Name must be between 8 and 20 characters"})
    readonly name: string;
    @IsString({message: "Type must be a string"})
    readonly type: string;
    @IsString({message: "Birth date must be a string"})
    readonly birthDate: string;
}