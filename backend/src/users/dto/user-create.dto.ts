export class UserCreateDto {
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly name: string;
    readonly pushNotifications: boolean;
    readonly emailNotifications: boolean;
}

export class UserLoginDto {
    readonly email: string;
    readonly password: string;
}