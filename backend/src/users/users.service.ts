import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(dto: UserCreateDto): Promise<User> {
        const newUser = this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }
    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOneBy({ username });
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async updateUser(id: number, dto: Partial<UserUpdateDto>): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        this.userRepository.merge(user, dto);

        return this.userRepository.save(user);
        
    }
    
    mapToProfileDto(user: User): UserProfileDto {
        const { password, ...profile } = user;
        return profile as UserProfileDto;
    }
}