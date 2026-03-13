import { Controller, Get } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get()
  findAll(): {
    id: string;
    eventId: string;
    eventTitle: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
  }[] {
    return this.registrationService.findAll();
  }
}
