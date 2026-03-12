import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { RegisterEventDto } from './dto/register-event.dto';

interface RegistrationRecord {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

@Injectable()
export class RegistrationService {
  private registrations: RegistrationRecord[] = [];

  constructor(private readonly eventsService: EventsService) {}

  register(eventId: string, data: RegisterEventDto): RegistrationRecord {
    const event = this.eventsService.findById(eventId);

    const exists = this.registrations.some(
      (item) => item.eventId === event.id && item.email === data.email,
    );

    if (exists) {
      return this.registrations.find(
        (item) => item.eventId === event.id && item.email === data.email,
      ) as RegistrationRecord;
    }

    const record: RegistrationRecord = {
      id: String(this.registrations.length + 1),
      eventId: event.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    this.registrations.push(record);

    return record;
  }
}
