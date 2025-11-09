import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiSchema } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validations.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 200, description: `{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }` 
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'example@.com' },
                password: { type: 'string', example: 'strongPassword123' },
                username: { type: 'string', example: 'shb213as' },
                name: { type: 'string', example: 'Nazar123' },
            },
            required: ['email', 'password', 'username', 'name'],
        },
    })
    @UsePipes(ValidationPipe)
    @Post('register')
    register(@Body() userDTO: UserCreateDto) {
        return this.authService.register(userDTO);
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: `{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }` 
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'example@.com' },
                password: { type: 'string', example: 'strongPassword123' },
            },
            required: ['email', 'password'],
        },
    })
    @UsePipes(ValidationPipe)
    @Post('login')
    login(@Body() userDTO: UserLoginDto) {
        return this.authService.login(userDTO);
    }


}
