import { Controller, Delete, Put } from '@nestjs/common';

@Controller('events')
export class EventsController {
    @Put()
    updteEvents() {
        // Дія: Оновлення існуючої події.
        // Авторизація: Потрібен токен.
    }

    @Delete(':eventId')
    deleteEvent() {
        // Дія: Видалення події за її ідентифікатором.
        // Авторизація: Потрібен токен.
    }

    
}
