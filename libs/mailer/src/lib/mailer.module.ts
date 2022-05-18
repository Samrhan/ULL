import {DynamicModule, Module} from '@nestjs/common';
import {MailerService} from './mailer.service';
import {ConfigModule} from "@nestjs/config";
import {mailerConfig} from "./mailer.config";

@Module({
  providers: [MailerService],
  imports: [ConfigModule.forRoot(), ConfigModule.forFeature(mailerConfig)],
  exports: [MailerService]
})
export class MailerModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: MailerModule,
    };
  }
}
