import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {NodeMailgun} from "ts-mailgun";
import {ConfigService, ConfigType} from "@nestjs/config";
import {mailerConfig} from "./mailer.config";

@Injectable()
export class MailerService implements OnModuleInit {

  @Inject(mailerConfig.KEY) private readonly mailerConfig!: ConfigType<typeof mailerConfig>;

  @Inject() configService!: ConfigService;

  mailer!: NodeMailgun;

  onModuleInit() {
    this.mailer = new NodeMailgun();
    this.mailer.apiKey = this.mailerConfig.apiKey
    this.mailer.domain = this.mailerConfig.domainName;
    this.mailer.fromEmail = 'noreply@ull.sbader.fr';
    this.mailer.fromTitle = 'Ull';
    this.mailer.options = {
      host: 'api.eu.mailgun.net'
    };
    this.mailer.unsubscribeLink = false;
    this.mailer.init();
  }

  async sendMail(recipient: string, subject: string, content: string) {
    console.log(recipient)
    await this.mailer.send(recipient, subject, content)
  }

}
