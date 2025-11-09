import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(
            @InjectRepository(Event)
            private eventRepository: Repository<Event>,
        ) {}

    async createEvent(createEventDto: CreateEventDto) {
        const event = this.eventRepository.create(createEventDto);
        return await this.eventRepository.save(event);
    }

    async updateEvents(petId: number, updateEventDto: UpdateEventDto) {
        const event = await this.eventRepository.findOneBy({ petId: petId });
        if (!event) {
            throw new Error('Event not found');
        }
        this.eventRepository.merge(event, updateEventDto);
        return await this.eventRepository.save(event);
    }

    async deleteEvent(petId: number) {
        const event = await this.eventRepository.findOneBy({ petId: petId });
        if (!event) {
            throw new Error('Event not found');
        }
        return await this.eventRepository.remove(event);
    }

    async getEvents(petId: number): Promise<Event[]> {
        return this.eventRepository.find({ where: { petId: petId } });
    }
}
