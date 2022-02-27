import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FundAccountDto } from './dto/create-transaction.dto';
import { TransferToAccountDto } from './dto/create-transaction.dto';
import { WithdrawFromAccountDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private usersService: UsersService,
  ) {}

  private readonly Transactions = () => this.knex<Transaction>('transactions');
  private readonly Users = () => this.knex<User>('users');

  async fundAccount(data: FundAccountDto): Promise<{ message: string }> {
    const { email, amount } = data;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User Does Not Exist.');
    const { userId } = user;
    await this.Transactions().insert({ user: userId, type: 'CREDIT', amount });
    const newBalance = +user.balance + +amount;
    await this.usersService.update(user.userId, { balance: newBalance });
    return { message: 'Account was successfully credited' };
  }

  async withdrawFromAccount(
    data: WithdrawFromAccountDto,
  ): Promise<{ message: string }> {
    const { email, amount } = data;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User Does Not Exist.');
    const { userId, balance } = user;
    if (balance < +amount)
      throw new BadRequestException('Insufficient Balance.');
    await this.Transactions().insert({ user: userId, type: 'DEBIT', amount });
    const newBalance = +user.balance - +amount;
    await this.usersService.update(user.userId, { balance: newBalance });
    return { message: 'Account was successfully debited' };
  }

  async transferToAccount(
    data: TransferToAccountDto,
  ): Promise<{ message: string }> {
    try {
      await this.knex.transaction(async (trx) => {
        const { emailTo, emailFrom, amount } = data;
        if (emailFrom == emailTo)
          throw new Error('Conflict in Sending and Receiving User');
        const userTo = await this.usersService.findOneByEmail(emailTo);
        if (!userTo) throw new Error('Receiving User Does Not Exist.');
        const userFrom = await this.usersService.findOneByEmail(emailFrom);
        if (!userFrom) throw new Error('Sending User Does Not Exist.');
        const { userId: userIdFrom, balance: userFromBalance } = userFrom;
        const { userId: userIdTo, balance: userToBalance } = userTo;
        if (userFromBalance < +amount) throw new Error('Insufficient Balance.');
        const transFrom: any = { user: userIdFrom, type: 'DEBIT', amount };
        await this.Transactions().insert(transFrom).transacting(trx);
        const transTo: any = { user: userIdTo, type: 'CREDIT', amount };
        await this.Transactions().insert(transTo).transacting(trx);
        const newToBalance = +userToBalance + +amount;
        const newFromBalance = +userFromBalance - +amount;
        await this.Users()
          .update({ balance: newFromBalance })
          .where('userId', userIdFrom)
          .transacting(trx);
        await this.Users()
          .update({ balance: newToBalance })
          .where('userId', userIdTo)
          .transacting(trx);
      });
      return { message: 'Transfer successful' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
