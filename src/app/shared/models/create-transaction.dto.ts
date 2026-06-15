import { TransactionStatus } from '../enums/transaction-status.enum';

export type CreateTransactionDto = {
    customerName: string;
    amount: number;
    status: TransactionStatus;
}