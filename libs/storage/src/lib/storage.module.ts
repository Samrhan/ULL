import {DynamicModule, Module} from '@nestjs/common';
import {StorageService} from "./storage.service";

@Module({
  imports: [],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: StorageModule,
    };
  }
}
