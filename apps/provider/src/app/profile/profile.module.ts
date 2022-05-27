import {Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [ConfigModule.forRoot()]
})
export class ProfileModule {}
