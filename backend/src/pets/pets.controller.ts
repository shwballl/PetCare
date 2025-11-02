import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { AuthService } from 'src/auth/auth.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {

    constructor(private petsService: PetsService, private authService: AuthService) {}

    @ApiOperation({ summary: 'Get all pets of the current user' })
    @ApiResponse({ status: 200, description: `[
        {
            "id": 1,
            "name": "Buddy",
            "type": "Dog",
            "birthDate": "2022-01-01T00:00:00.000Z"
            "createdAt": "2025-10-30T21:41:18.633Z",
            "updatedAt": "2025-10-30T21:41:18.633Z"
        }
    ]`
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllPets(@Req() request: any) {
        return this.petsService.getAllPets(request.user.id);
    }

    @ApiOperation({ summary: 'Add a new pet for the current user' })
    @ApiResponse({ status: 201, description: `{
        "id": 2,
        "name": "Whiskers",
        "type": "Cat",
        "birthDate": "2022-01-01T00:00:00.000Z",
        "createdAt": "2025-10-30T22:00:00.000Z",
        "updatedAt": "2025-10-30T22:00:00.000Z"
    }`
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Whiskers' },
                type: { type: 'string', example: 'Cat' },
                age: { type: 'number', example: 2 },
            },
            required: ['name', 'type', 'age'],
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post()
    async addNewPet(@Body() petData: CreatePetDto, @Req() request: Request) {
        const user = await this.authService.getUserFromToken(request.headers['authorization']);
        return this.petsService.addNewPet(petData, user.id);
    }

    @ApiOperation({ summary: 'Get pet by ID' })
    @ApiResponse({ status: 200, description: `{
        "id": 1,
        "name": "Buddy",
        "type": "Dog",
        "birthDate": "2022-01-01T00:00:00.000Z",
        "createdAt": "2025-10-30T21:41:18.633Z",
        "updatedAt": "2025-10-30T21:41:18.633Z"
    }`
    })
    @UseGuards(JwtAuthGuard)
    @Get(':petId')
    getPetById(@Param('petId') petId: number) {
        return this.petsService.getPetById(petId);
    }

    @ApiOperation({ summary: 'Update pet by ID' })
    @ApiResponse({ status: 200, description: `{
        "id": 1,
        "name": "BuddyUpdated",
        "type": "Dog",
        "birthDate": "2022-01-01T00:00:00.000Z",
        "createdAt": "2025-10-30T21:41:18.633Z",
        "updatedAt": "2025-10-30T22:30:00.000Z"
    }`
    })
    @ApiParam({ name: 'petId', required: true, description: 'Unique identifier of the pet to be updated', example: 1 })
    @UseGuards(JwtAuthGuard)
    @Put(':petId')
    updatePetById(@Body() body: UpdatePetDto, @Param('petId') petId: number) {
        return this.petsService.updatePet(petId, body);
    }

    @ApiOperation({ summary: 'Delete pet by ID' })
    @ApiResponse({ status: 200, description: `{
        "message": "Pet with ID 1 has been deleted successfully."
    }`
    })
    @ApiParam({ name: 'petId', required: true, description: 'Unique identifier of the pet to be deleted', example: 1 })
    @UseGuards(JwtAuthGuard)
    @Delete(':petId')
    deletePetById(@Param('petId') petId: number) {
        // Дія: Видалити конкретного улюбленця за його ідентифікатором.
        // Авторизація: Потрібен токен.
        // Параметри шляху: petId (унікальний ідентифікатор улюбленця).
        // Повертає: Повідомлення про успішне видалення.
        return this.petsService.deletePetById(petId);
    }
    
    @Get(':petId/events')
    getPetEvents() {
        // Дія: Отримати список усіх подій (минулих і майбутніх) для конкретного улюбленця.
        // Авторизація: Потрібен токен.
        // Повертає: Масив подій (напр., {type: 'meal', time: '...'}, {type: 'vet_visit', title: 'Вакцинація', time: '...'}).
    }

    @Post(':petId/events')
    addPetEvent() {
        // Дія: Додати нову подію для конкретного улюбленця.
        // Авторизація: Потрібен токен.
        // Параметри тіла запиту: Інформація про подію (тип, час, додаткові деталі).
        // Повертає: Об'єкт доданої події з її унікальним ідентифікатором.
    }
}
