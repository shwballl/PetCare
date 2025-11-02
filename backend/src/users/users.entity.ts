import { Pet } from 'src/pets/pets.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', unique: true, nullable: false})
    email: string; 
    
    @Column({type: 'varchar', nullable: false})
    password: string; 
    
    @Column({type: 'varchar', unique: true, nullable: false})
    username: string; 
    
    @Column({type: 'varchar', nullable: true})
    name: string; 

    @Column({type: 'boolean', default: true})
    pushNotifications: boolean;

    @Column({type: 'boolean', default: false})
    emailNotifications: boolean;

    @OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[];
}