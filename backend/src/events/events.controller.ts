import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import type { EventEntity } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): EventEntity {
    return this.eventsService.findById(id);
  }
}
