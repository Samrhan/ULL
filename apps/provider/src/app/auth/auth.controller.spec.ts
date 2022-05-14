import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from "./auth.service";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entity/provider.entity";
import {DatabaseModule} from "../shared/database/database.module";

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const fakeRegisterDto = {
    'company_name': 'test',
    'email': 'test@test.com',
    'siren': '123456789',
    'phone_number': '+33123456789',
    'password': 'test',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [HttpModule, ConfigModule.forRoot(), DatabaseModule, TypeOrmModule.forFeature([Provider])]
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService)
  });

  it('register should call register', () => {
    const spy = jest.spyOn(service, "register").mockResolvedValue()
    controller.register(fakeRegisterDto);
    expect(spy).toHaveBeenCalledWith(fakeRegisterDto);
  });
});
