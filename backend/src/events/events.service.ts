import { Injectable, NotFoundException } from '@nestjs/common';
import { events } from './events.data';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {
  findById(id: string): EventEntity {
    const event = events.find((item) => item.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found`);
    }

    return event;
  }
}
