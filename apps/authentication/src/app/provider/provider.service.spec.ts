import {Test, TestingModule} from '@nestjs/testing';
import {ProviderService} from './provider.service';
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {ProviderAccount} from "./provider-account.entity";
import * as bcrypt from 'bcrypt'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const saveMock = jest.fn(entity => entity)

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: saveMock,
}));

describe('ProviderService', () => {
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderService,
        // Provide your mock instead of the actual repository
        {provide: getRepositoryToken(ProviderAccount), useFactory: repositoryMockFactory},
      ],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<ProviderService>(ProviderService);
  });

  it('should insert user in database and btw hash password', async () => {
    await service.register({idProvider: 'test', password: 'test', email: 'test'})
    expect(saveMock.mock.calls[0][0].idProvider).toEqual('test')
    expect(saveMock.mock.calls[0][0].email).toEqual('test')
    expect(await bcrypt.compare('test', saveMock.mock.calls[0][0].password)).toBeTruthy()
  });
});
