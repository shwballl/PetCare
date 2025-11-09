import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {

    constructor(private eventsService: EventsService) {}

    @ApiOperation({ summary: 'Create a new event' })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'Event successfully created.' })
    @UseGuards(JwtAuthGuard)
    @Post()
    createEvent(@Body() createEventDto: CreateEventDto) {
       return this.eventsService.createEvent(createEventDto);
    }

    @ApiOperation({ summary: 'Update an event by its ID' })
    @ApiBody({ type: UpdateEventDto })
    @ApiResponse({ status: 200, description: 'Event successfully updated.' })
    @UseGuards(JwtAuthGuard)
    @Put(':petId')
    updateEvents(@Param('petId') petId: number, @Body() updateEventDto: UpdateEventDto) {
        return this.eventsService.updateEvents(petId, updateEventDto);
    }

    @ApiOperation({ summary: 'Delete an event by its ID' })
    @ApiResponse({ status: 200, description: 'Event successfully deleted.' })
    @UseGuards(JwtAuthGuard)
    @Delete(':petId')
    deleteEvent(@Param('petId') petId: number) {
        return this.eventsService.deleteEvent(petId);
    }
    @ApiOperation({ summary: 'Get all events for a specific pet' })
    @ApiResponse({ status: 200, description: 'List of events for the specified pet.' })
    @UseGuards(JwtAuthGuard)
    @Get(':petId')
    getEvents(@Param('petId') petId: number) {
        return this.eventsService.getEvents(petId);
    }

    
}
