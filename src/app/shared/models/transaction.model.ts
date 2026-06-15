import { TransactionStatus } from '../enums/transaction-status.enum';

export interface Transaction {
    id: string;
    customerName: string;
    amount: number;
    status: TransactionStatus;
    createdAt: Date;
}