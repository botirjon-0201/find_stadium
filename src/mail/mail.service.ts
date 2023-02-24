import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User): Promise<void> {
    const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Stadium App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.first_name,
        url,
      },
    });
  }
}
