import { Test, TestingModule } from '@nestjs/testing';
import {
  fundResponseStub,
  fundStub,
  transferResponseStub,
  transferStub,
  withdrawResponseStub,
  withdrawStub,
} from '../../test/stubs/transaction.stub';
import { FundAccountDto } from './dto/create-transaction.dto';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

jest.mock('./transactions.service.ts');
describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fundAccount', () => {
    describe('when fund is called', () => {
      let response: { message: string };

      beforeEach(async () => {
        response = await controller.fund(fundStub());
      });

      test('then it should call transactionsService', () => {
        expect(service.fundAccount).toBeCalledWith(fundStub());
      });

      test('then it should return an transaction response', () => {
        expect(response).toEqual(fundResponseStub());
      });
    });
  });

  describe('withdrawAmount', () => {
    describe('when withdraw is called', () => {
      let response: { message: string };

      beforeEach(async () => {
        response = await controller.withdraw(withdrawStub());
      });

      test('then it should call transactionsService', () => {
        expect(service.withdrawFromAccount).toBeCalledWith(withdrawStub());
      });

      test('then it should return an transaction response', () => {
        expect(response).toEqual(withdrawResponseStub());
      });
    });
  });

  describe('transferAmount', () => {
    describe('when transfer is called', () => {
      let response: { message: string };

      beforeEach(async () => {
        response = await controller.transfer(transferStub());
      });

      test('then it should call transactionsService', () => {
        expect(service.transferToAccount).toBeCalledWith(transferStub());
      });

      test('then it should return an transaction response', () => {
        expect(response).toEqual(transferResponseStub());
      });
    });
  });
});
