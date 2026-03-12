import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import type { EventEntity } from './event.entity';
import { GetEventsQueryDto } from './dto/get-events-query.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: GetEventsQueryDto): {
    data: EventEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): EventEntity {
    return this.eventsService.findById(id);
  }
}
