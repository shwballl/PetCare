import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./events.entity";
import { CreateEventDto } from "./dto/create-event.dto";

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
      throw new Error("Event not found");
    }
    this.eventRepository.merge(event, updateEventDto);
    return await this.eventRepository.save(event);
  }

  async deleteEvent(eventId: number): Promise<void> {
    const result = await this.eventRepository.delete(eventId);
    if (result.affected === 0) {
      throw new NotFoundException(`Подію з ID ${eventId} не знайдено`);
    }
  }

  async getEvents(petId: number): Promise<Event[]> {
    return this.eventRepository.find({ where: { petId: petId } });
  }
}
