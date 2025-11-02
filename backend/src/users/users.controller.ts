import { Controller, forwardRef, Get, Inject, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService,@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}


    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: `{
        "id": 1,
        "email": "example@.com",
        "username": "shb213as",
        "name": "Nazar123",
        "createdAt": "2025-10-30T21:41:18.633Z",
        "updatedAt": "2025-10-30T21:41:18.633Z"
        }` 
    })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUser(@Req() request: Request) {
        const user = await this.authService.getUserFromToken(request.headers['authorization']);

        if (!user) {
            throw new UnauthorizedException('User specified in token not found.');
        }
        
        return this.userService.mapToProfileDto(user); 
    }

    @ApiOperation({ summary: 'Update current user profile' })
    @ApiResponse({ status: 200, description: `{
        "id": 1,
        "email": "example@.com",
        "username": "shb213as",
        "name": "UpdatedName",
        "createdAt": "2025-10-30T21:41:18.633Z",
        "updatedAt": "2025-10-30T22:00:00.000Z"
        }` 
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'UpdatedName' },
                email: { type: 'string', example: 'example@.com' },
                username: { type: 'string', example: 'shb213as' },
            },
            required: ['name'],
        },
    })
    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateUser(@Req() request: Request){
        const user = await this.authService.getUserFromToken(request.headers['authorization']);

        if (!user) {
            throw new UnauthorizedException('User specified in token not found.');
        }

        return this.userService.updateUser(user.id, {
            name: (request as any).body.name,
        });
    }

    @Get('me/settings')
    getUserSettings(){
        // Дія: Отримання налаштувань користувача (напр., для екрану "Налаштування").
        // Авторизація: Потрібен токен.
        // Повертає: push_notifications: true, dark_mode: false тощо.
    }

    @Put('me/settings')
    updateUserSettings(){
        // Дія: Оновлення налаштувань користувача.
        // Авторизація: Потрібен токен.
        // Приймає: push_notifications, dark_mode тощо.
    }

    
}

