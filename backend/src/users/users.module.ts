import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService
  ],
})
export class UsersModule {} 
