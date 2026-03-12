import { Body, Controller, Param, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterEventDto } from './dto/register-event.dto';

@Controller('events')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post(':id/register')
  register(
    @Param('id') id: string,
    @Body() body: RegisterEventDto,
  ): { success: boolean; message: string } {
    this.registrationService.register(id, body);

    return {
      success: true,
      message: 'Registration successful',
    };
  }
}
