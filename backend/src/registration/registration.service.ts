import { ConflictException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';
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

  constructor(
    private readonly eventsService: EventsService,
    @InjectQueue('registration')
    private readonly registrationQueue: Queue,
  ) {}

  register(eventId: string, data: RegisterEventDto): RegistrationRecord {
    const event = this.eventsService.findById(eventId);

    const exists = this.registrations.some(
      (item) => item.eventId === event.id && item.email === data.email,
    );

    if (exists) {
      throw new ConflictException('Registration already exists');
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

    void this.registrationQueue.add(
      'create-registration',
      {
        eventId: record.eventId,
        fullName: record.fullName,
        email: record.email,
        phone: record.phone,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    return record;
  }
}
