import { Injectable } from '@angular/core';
import { Transaction } from '../../shared/models/transaction.model';
import { TransactionStatus } from '../../shared/enums/transaction-status.enum';

@Injectable({
    providedIn: 'root'
})
export class MockTransactionService {


    getTransactions(): Transaction[] {
        return [
            {
                id: 'TXN001',
                customerName: 'Raj Kumar',
                amount: 5000,
                status: TransactionStatus.SUCCESS,
                createdAt: new Date()
            },
            {
                id: 'TXN002',
                customerName: 'John David',
                amount: 2500,
                status: TransactionStatus.PENDING,
                createdAt: new Date()
            },
            {
                id: 'TXN003',
                customerName: 'Priya',
                amount: 10000,
                status: TransactionStatus.FAILED,
                createdAt: new Date()
            }
        ]
    }
}