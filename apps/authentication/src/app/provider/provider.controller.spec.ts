import {Test, TestingModule} from '@nestjs/testing';
import {ProviderController} from './provider.controller';
import {ProviderService} from "./provider.service";
import {DatabaseModule} from "../shared/database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProviderAccount} from "./provider-account.entity";

describe('ProviderController', () => {
  let controller: ProviderController;
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderController],
      providers: [ProviderService],
      imports: [DatabaseModule, TypeOrmModule.forFeature([ProviderAccount])]
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
    service = module.get<ProviderService>(ProviderService);
  });

  it('should register provider', async () => {
    const spy = jest.spyOn(service, 'register').mockResolvedValue({idProvider: 'test', email: 'test', password: ''});
    await controller.registerProvider({idProvider: 'test', password: 'test', email: 'test'}, {} as never);
    expect(spy).toHaveBeenCalledWith({idProvider: 'test', password: 'test', email: 'test'})
  });
});
