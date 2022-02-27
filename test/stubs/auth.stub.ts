import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { userStub } from './user.stub';

export const registerStub = (): RegisterDto => ({
  email: 'testuser@email.com',
  name: 'Test User',
});

export const loginStub = (): LoginDto => ({
  email: 'testuser@email.com',
});

export const authResponseStub = (): AuthResponseDto => ({
  token: tokenStub(),
  user: userStub(),
});

export const tokenStub = (): string =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwZjZhMmFjLTk4MDUtMTFlYy05ODc2LTBhOWRiZmI1Y2YwYiIsImlhdCI6MTY0NTk5NjAyNCwiZXhwIjoxNjQ2MDM5MjI0fQ.i5CnXiDPg8HPd5-bjfCgxV9EvmS9HhMSA-uXL8sRmwU';
