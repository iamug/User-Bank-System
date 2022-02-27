export class Transaction {
  id: string;

  transactionId: string;

  user: string;

  amount: number;

  type: 'CREDIT' | 'DEBIT';

  date: Date;

  createdAt: Date;

  updatedAt: Date;
}
