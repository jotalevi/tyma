/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { readFileSync } from 'fs';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  private loadEmailTemplate(templateName: string): string {
    const templatePath = join(__dirname, '..', '..', '..', '..', 'templates', 'email', templateName);
    return readFileSync(templatePath, 'utf8');
  }

  async sendTemplateEmail(
    to: string[],
    subject: string,
    cc: string[],
    replyTo: string[],
    template: string,
    data: any,
  ): Promise<any> {
    return ;
    let templateFile = this.loadEmailTemplate(`${template}.html`);
    
    Object.keys(data).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      templateFile = templateFile.replaceAll(regex, data[key]);
    });

    return await this.mailerService.sendMail({
      to,
      subject,
      from: `"${subject}" <web@elsauce.cl>`,
      cc: cc,
      replyTo: replyTo,
      html: templateFile,
    });
  }
}
