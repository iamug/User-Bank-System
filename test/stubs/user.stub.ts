import { User } from 'src/users/entities/user.entity';

export const userStub = (): User => ({
  id: 1,
  email: 'testuser@email.com',
  name: 'Test User',
  isEnabled: 1,
  userId: 'c0f6a2ac-9805-11ec-9876-0a9dbfb5cf0b',
  balance: 500,
  createdAt: '2022-02-27T21:46:39.581Z',
  updatedAt: '2022-02-27T21:46:39.581Z',
});

export const tokenStub = (): string =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwZjZhMmFjLTk4MDUtMTFlYy05ODc2LTBhOWRiZmI1Y2YwYiIsImlhdCI6MTY0NTk5NjAyNCwiZXhwIjoxNjQ2MDM5MjI0fQ.i5CnXiDPg8HPd5-bjfCgxV9EvmS9HhMSA-uXL8sRmwU';
