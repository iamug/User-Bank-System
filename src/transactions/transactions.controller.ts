import { Controller, Get, Post, Body } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { FundAccountDto } from './dto/create-transaction.dto';
import { TransferToAccountDto } from './dto/create-transaction.dto';
import { WithdrawFromAccountDto } from './dto/create-transaction.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionResponseDto } from './dto/transaction-response.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({ type: TransactionResponseDto })
  @Post('/fund')
  async fund(@Body() body: FundAccountDto) {
    try {
      const res = await this.transactionsService.fundAccount(body);
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ type: TransactionResponseDto })
  @Post('/withdraw')
  async withdraw(@Body() body: WithdrawFromAccountDto) {
    try {
      const res = await this.transactionsService.withdrawFromAccount(body);
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ type: TransactionResponseDto })
  @Post('/transfer')
  async transfer(@Body() body: TransferToAccountDto) {
    try {
      return await this.transactionsService.transferToAccount(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
