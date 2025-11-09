import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { EventsModule } from './events/events.module';
import { CommunityModule } from './community/community.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { User } from './users/users.entity';
import { Pet } from './pets/pets.entity';
import { Event } from './events/events.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Pet, Event],
      synchronize: true,
    }),

    AuthModule,
    PetsModule,
    EventsModule,
    CommunityModule,
    UsersModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
