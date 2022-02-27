import { transferResponseStub } from '../../../test/stubs/transaction.stub';
import { withdrawResponseStub } from '../../../test/stubs/transaction.stub';
import { fundResponseStub } from '../../../test/stubs/transaction.stub';
import { transferStub } from '../../../test/stubs/transaction.stub';

export const TransactionsService = jest.fn().mockReturnValue({
  fundAccount: jest.fn().mockReturnValue(fundResponseStub()),
  withdrawFromAccount: jest.fn().mockReturnValue(withdrawResponseStub()),
  transferToAccount: jest.fn().mockReturnValue(transferResponseStub()),
});
