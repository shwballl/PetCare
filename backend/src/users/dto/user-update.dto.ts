import { IsBoolean, IsEmail, IsString, Length } from "class-validator";

export class UserUpdateDto {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Length(6, 20, { message: 'Email must be between 6 and 20 characters' })
    readonly email: string;

    @IsString({ message: 'Username must be a string' })
    @Length(6, 20, { message: 'Username must be between 6 and 20 characters' })
    readonly username: string;

    @IsString({ message: 'Name must be a string' })
    @Length(6, 20, { message: 'Name must be between 6 and 20 characters' })
    readonly name: string;

    @IsBoolean({ message: 'Push notifications must be a boolean' })
    readonly pushNotifications: boolean;

    @IsBoolean({ message: 'Email notifications must be a boolean' })
    readonly emailNotifications: boolean;
}