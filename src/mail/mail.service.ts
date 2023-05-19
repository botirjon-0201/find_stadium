import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(data: any): Promise<void> {
    const { activation_link, email, first_name } = data;
    const url = `${process.env.API_HOST}/api/users/activate/${activation_link}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Stadium App! Confirm your Email',
      template: './confirmation',
      context: {
        name: first_name,
        url,
      },
    });
  }
}
