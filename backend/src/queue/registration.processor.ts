import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

interface RegistrationJobPayload {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
}

@Processor('registration')
export class RegistrationProcessor extends WorkerHost {
  process(job: Job<RegistrationJobPayload>): Promise<void> {
    const { eventId, fullName, email, phone } = job.data;
    console.log(
      `Processing registration job for event ${eventId}: ${fullName} <${email}> (${phone})`,
    );

    return Promise.resolve();
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<RegistrationJobPayload>, error: unknown): void {
    console.error(
      `Registration job ${job.id} for event ${job.data.eventId} failed:`,
      error,
    );
  }
}
