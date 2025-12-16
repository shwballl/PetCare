import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
    ) {}

    async getAllPets(userId: number): Promise<Pet[]> {
        return this.petRepository.find({ 
            where: { ownerId: userId } 
        });
    }

    async addNewPet(petData: CreatePetDto, userId: number): Promise<Pet> {
        const petAttributes = this.petRepository.create({
            ...petData,
            ownerId: userId,
            birthDate: new Date('2022-01-01'),
        });

        return this.petRepository.save(petAttributes);
    }

    async getPetById(petId: number): Promise<Pet | null> {
        return this.petRepository.findOne({ where: { id: petId }, relations: ['owner'] });
    }

    async updatePet(petId: number, petData: Partial<UpdatePetDto>): Promise<Pet> {
        const pet = await this.petRepository.findOne({ where: { id: petId }, relations: ['owner'] });
        if (!pet) {
            throw new Error(`Pet with ID ${petId} not found`);
        }
        this.petRepository.merge(pet, petData);

        return this.petRepository.save(pet);
    }

    async deletePetById(petId: number): Promise<{ message: string }> {
        const pet = await this.petRepository.findOneBy({ id: petId });
        if (!pet) {
            throw new Error(`Pet with ID ${petId} not found`);
        }
        await this.petRepository.delete(petId);
        return { message: `Pet with ID ${petId} has been deleted successfully.` };
    }
}