import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { RegistrationModule } from './registration/registration.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [EventsModule, RegistrationModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
