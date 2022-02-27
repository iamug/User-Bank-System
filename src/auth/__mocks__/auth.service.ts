import { authResponseStub } from '../../../test/stubs/auth.stub';
import { tokenStub } from '../../../test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  getTokenExpires: jest.fn().mockReturnValue(43200),
  getToken: jest.fn().mockReturnValue(tokenStub()),
  register: jest.fn().mockReturnValue(authResponseStub()),
  signin: jest.fn().mockReturnValue(authResponseStub()),
});
