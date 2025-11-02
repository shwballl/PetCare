import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto, UserLoginDto } from 'src/users/dto/user-create.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(userDTO: UserCreateDto) {
        const user = await this.userService.findByEmail(userDTO.email);
        if (user) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }
        const newPassword = await bcrypt.hash(userDTO.password, 5);
        const newUser = await this.userService.createUser({
            ...userDTO,
            password: newPassword,
        });
        return this.generateToken(newUser);
    }

    async login(userDTO: UserLoginDto) {
        const user = await this.validateUser(userDTO);
        return this.generateToken(user);
    }

    private async generateToken(user: any) {
        const payload = { email: user.email, id: user.id, username: user.username, name: user.name };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDTO: UserLoginDto) {
        const user = await this.userService.findByEmail(userDTO.email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const passwordEquals = await bcrypt.compare(userDTO.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Invalid email or password' });
    }

    async getUserFromToken(token: string): Promise<any> {
        if (!token) {
            return null;
        }

        const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token;

        try {
            const payload = this.jwtService.verify(rawToken);
            
            return payload; 

        } catch (e) {
            return null;
        }
    }
}
