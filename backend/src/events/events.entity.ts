import { Pet } from "src/pets/pets.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class Event{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', nullable: false})
    name: string;
    @Column({type: 'date', nullable: false})
    date: Date;
    @Column({type: 'text', nullable: false})
    details: string;
    @Column({default: false})
    checked: boolean;
    
    @ManyToOne(() => Pet, pet => pet.events, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'petId' })
    pet: Pet;

    @Column()
    petId: number;
}