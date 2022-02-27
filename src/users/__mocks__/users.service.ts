import { userStub } from 'test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(userStub()),
  findOneByEmail: jest.fn().mockReturnValue(userStub()),
  update: jest.fn().mockReturnValue(userStub()),
});
