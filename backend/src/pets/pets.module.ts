import { forwardRef, Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet } from './pets.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PetsService],
  controllers: [PetsController],
  imports: [
      TypeOrmModule.forFeature([Pet]),
      AuthModule
  ],
  exports: [PetsService],
})
export class PetsModule {}
