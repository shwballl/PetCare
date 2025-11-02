import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/pets/pets.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Pet) 
    private petsRepository: Repository<Pet>,
  ) {}

  async getCommunityFeed(): Promise<Pet[]> {
    return this.petsRepository.find({
      order: { id: 'DESC' }, 
    });
  }

}