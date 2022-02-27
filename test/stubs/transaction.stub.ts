import { FundAccountDto } from 'src/transactions/dto/create-transaction.dto';
import { TransferToAccountDto } from 'src/transactions/dto/create-transaction.dto';
import { WithdrawFromAccountDto } from 'src/transactions/dto/create-transaction.dto';

export const fundStub = (): FundAccountDto => ({
  email: 'testuser@email.com',
  amount: 500,
});
export const fundResponseStub = (): { message: string } => ({
  message: 'Account was successfully credited',
});
export const withdrawStub = (): WithdrawFromAccountDto => ({
  email: 'testuser@email.com',
  amount: 100,
});
export const withdrawResponseStub = (): { message: string } => ({
  message: 'Account was successfully debited',
});
export const transferStub = (): TransferToAccountDto => ({
  emailTo: 'testuser@email.com',
  emailFrom: 'testuser2@email.com',
  amount: 200,
});
export const transferResponseStub = (): { message: string } => ({
  message: 'Transfer successful',
});
