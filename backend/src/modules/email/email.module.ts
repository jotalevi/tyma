import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "smtp.gmail.com", // Replace with your SMTP server
          port: 465,
          auth: {
            user: "web@elsauce.cl",
            pass: "bjevytppsfvyqfvr"
          }
        },
        defaults: {
          from: '"No Reply" <web@elsauce.cl>' // Default sender address
        }
      })
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
