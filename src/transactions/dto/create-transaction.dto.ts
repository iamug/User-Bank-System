import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class FundAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email address of user to fund account' })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Amount of fund user account' })
  amount: number;
}

export class WithdrawFromAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email address of user to withdraw from account.',
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Amount to withdraw from user account' })
  amount: number;
}

export class TransferToAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email address of user transfer from account.' })
  emailFrom: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email address of user to transfer to account' })
  emailTo: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Amount to tranfer' })
  amount: number;
}
