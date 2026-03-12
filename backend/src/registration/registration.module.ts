import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { RegistrationService } from './registration.service';

@Module({
  imports: [EventsModule],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
