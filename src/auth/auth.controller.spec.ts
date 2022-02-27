import { Test, TestingModule } from '@nestjs/testing';
import {
  authResponseStub,
  loginStub,
  registerStub,
} from '../../test/stubs/auth.stub';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

jest.mock('./auth.service.ts');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('registerUser', () => {
    describe('when regiser is called', () => {
      let user: AuthResponseDto;
      beforeEach(async () => {
        user = await authController.register(registerStub());
      });

      test('then it should call authService', () => {
        expect(authService.register).toBeCalledWith(registerStub());
      });

      test('then it should return an auth response', () => {
        expect(user).toEqual(authResponseStub());
      });
    });
  });

  describe('loginUser', () => {
    describe('when login is called', () => {
      let user: AuthResponseDto;
      beforeEach(async () => {
        user = await authController.login(loginStub());
      });

      test('then it should call authService', () => {
        expect(authService.signin).toBeCalledWith(loginStub());
      });

      test('then it should return an auth response', () => {
        expect(user).toEqual(authResponseStub());
      });
    });
  });
});
