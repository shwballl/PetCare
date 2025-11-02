import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pets')
export class Pet{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', nullable: false})
    name: string;
    @Column({type: 'varchar', nullable: false})
    type: string;
    @Column({type: 'date', nullable: false})
    birthDate: Date;
    @Column()
    ownerId: number; 

    @ManyToOne(() => User, user => user.pets)
    @JoinColumn({ name: 'ownerId' })
    owner: User;
}