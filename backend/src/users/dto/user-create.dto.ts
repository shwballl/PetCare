import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class UserCreateDto {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Length(6, 20, { message: 'Email must be between 6 and 20 characters' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    readonly password: string;

    @IsString({ message: 'Username must be a string' })
    @Length(6, 20, { message: 'Username must be between 6 and 20 characters' })
    readonly username: string;

    @IsString({ message: 'Name must be a string' })
    @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
    readonly name: string;

    readonly pushNotifications: boolean = true;

    readonly emailNotifications: boolean = true;
}

export class UserLoginDto {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Length(6, 20, { message: 'Email must be between 6 and 20 characters' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    readonly password: string;
}