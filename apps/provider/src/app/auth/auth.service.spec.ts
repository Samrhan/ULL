import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Provider} from "../profile/entity/provider.entity";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {of, throwError} from "rxjs";
import {BadRequestException} from "@nestjs/common";

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const saveMock = jest.fn(entity => entity)

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: saveMock,
}));

class NoErrorThrownError extends Error {
}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe('AuthService', () => {
  let service: AuthService;

  const fakeRegisterDto = {
    'company_name': 'test',
    'email': 'test@test.com',
    'siren': '123456789',
    'phone_number': '+33123456789',
    'password': 'test',
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        // Provide your mock instead of the actual repository
        {provide: getRepositoryToken(Provider), useFactory: repositoryMockFactory},
      ],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();
    service = module.get<AuthService>(AuthService);

  })

  beforeEach(() => {
    jest.clearAllMocks();
    service.amqpConnection = {request: jest.fn().mockReturnValue(of("test"))} as never
  })

  it('Should return Insee token correctly', async () => {
    jest.spyOn((service as any).httpService, 'post').mockReturnValue(of({data: {access_token: 'test'}}));
    expect(await service.getInseeToken()).toEqual('test')
  });

  it('Should check Siren and return if correct', async () => {
    jest.spyOn((service as any).httpService, 'get').mockReturnValue(of('test'));
    jest.spyOn(service, 'getInseeToken').mockResolvedValue('123456');
    expect(await service.checkSiren('123456789')).toBeUndefined();
  });

  it('Should check Siren and throw 400 if incorrect', async () => {
    jest.spyOn((service as any).httpService, 'get').mockReturnValue(throwError("test"));
    jest.spyOn(service, 'getInseeToken').mockResolvedValue('123456');
    const error = await getError(async () => await service.checkSiren('123456789'));

    expect(error).toBeInstanceOf(BadRequestException);
  });


  it("Should check siren on register", async () => {
    const spy = jest.spyOn(service, 'checkSiren').mockResolvedValue()
    await service.registerProvider(fakeRegisterDto);
    expect(spy).toHaveBeenCalledWith('123456789')
  })

  it("Should send data to auth service", async () => {
    jest.spyOn(service, 'checkSiren').mockResolvedValue()
    jest.spyOn(service, 'registerProviderAuthService').mockResolvedValue({} as never)
    await service.registerProvider(fakeRegisterDto, 'test');
    expect(service.registerProviderAuthService).toHaveBeenCalledWith("register", {
      "email": "test@test.com",
      "idProvider": "test",
      "password": "test"
    })
  })

  it("Should throw error if auth service throw error", async () => {
    jest.spyOn(service, 'checkSiren').mockResolvedValue()
    service.amqpConnection.request = jest.fn().mockResolvedValue(throwError('test'))
    const error = await getError(async () => await service.registerProvider(fakeRegisterDto, 'test'));
    expect(error).toBeInstanceOf(BadRequestException)
  })

  it('Should insert user in database', async () => {
    jest.spyOn(service, 'checkSiren').mockResolvedValue()
    await service.registerProvider(fakeRegisterDto, 'test');
    expect(service.providerRepository.save).toHaveBeenCalledWith({
      "areaServed": "",
      "companyDescription": "",
      "companyName": "test",
      "coverPicture": "default",
      "email": fakeRegisterDto.email,
      "id": "test",
      "phoneNumber": fakeRegisterDto.phone_number,
      "profilePicture": "default",
      "siren": fakeRegisterDto.siren
    })
  })

  it("Should throw error if database throw error", async () => {
    jest.spyOn(service, 'checkSiren').mockResolvedValue()
    saveMock.mockRejectedValueOnce('test')
    const error = await getError(async () => await service.registerProvider(fakeRegisterDto, 'test'));
    expect(error).toBeInstanceOf(BadRequestException)
  })
});
