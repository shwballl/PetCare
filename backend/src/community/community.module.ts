import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller'; 
import { Pet } from 'src/pets/pets.entity'; 

@Module({
    imports: [
      TypeOrmModule.forFeature([Pet]), 
    ],
    controllers: [CommunityController], 
    providers: [CommunityService], 
    exports: [CommunityService]
})
export class CommunityModule {}