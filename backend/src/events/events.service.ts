import { Injectable, NotFoundException } from '@nestjs/common';
import { events } from './events.data';
import { EventEntity } from './event.entity';
import { GetEventsQueryDto } from './dto/get-events-query.dto';

@Injectable()
export class EventsService {
  findAll(query: GetEventsQueryDto): {
    data: EventEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    let filtered = [...events];

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchLower),
      );
    }

    if (query.dateFrom) {
      const from = new Date(query.dateFrom).getTime();
      filtered = filtered.filter(
        (event) => new Date(event.date).getTime() >= from,
      );
    }

    if (query.dateTo) {
      const to = new Date(query.dateTo).getTime();
      filtered = filtered.filter(
        (event) => new Date(event.date).getTime() <= to,
      );
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * limit;
    const endIndex = startIndex + limit;

    const data = filtered.slice(startIndex, endIndex);

    return {
      data,
      total,
      page: safePage,
      limit,
      totalPages,
    };
  }

  findById(id: string): EventEntity {
    const event = events.find((item) => item.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found`);
    }

    return event;
  }
}
