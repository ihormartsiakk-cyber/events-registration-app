import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { QueueModule } from '../queue/queue.module';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [EventsModule, QueueModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
