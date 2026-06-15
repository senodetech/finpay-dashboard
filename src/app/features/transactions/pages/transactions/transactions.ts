import { Component, signal, computed } from '@angular/core';
import { MockTransactionService } from '../../../../shared/services/mock-transaction.service';
import { Transaction } from '../../../../shared/models/transaction.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-transactions',
  imports: [
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    SelectModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  transactionForm;

  statuses = [
    {
      label: 'Pending',
      value: 'PENDING'
    },
    {
      label: 'Success',
      value: 'SUCCESS'
    },
    {
      label: 'Failed',
      value: 'FAILED'
    }
  ];

  transactions = signal<Transaction[]>([]);
  searchTerm = signal('');
  dialogVisible = signal(false);

  transactionCount = computed(
    () => this.transactions().length
  );

  

  constructor(
    private transactionService: MockTransactionService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {{
    this.transactions.set(
      this.transactionService.getTransactions()
    );

    this.transactionForm = this.fb.group({

      customerName: [
        '',
        Validators.required
      ],

      amount: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      status: [
        'PENDING',
        Validators.required
      ]
      
    });
  }}

  filteredTransactions = computed(() => {

    const search = this.searchTerm().toLowerCase();

    return this.transactions().filter(txn =>
      txn.customerName
         .toLowerCase()
         .includes(search)
    );

  })

  updateSearch(
    event: Event
  ) {

    const value =
      (event.target as HTMLInputElement)
         .value;

    this.searchTerm.set(value);

  }

  openDialog() {
    this.dialogVisible.set(true);
  }

  confirmDelete(id: string) {

    this.confirmationService.confirm({

      message: 'Are you sure you want to delete this transaction?',
     
      header: 'Delete Transaction',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.transactions.update(
          transactions =>
            transactions.filter(
              txn => txn.id !== id
            )
        );

        this.messageService.add({

          severity: 'success',

          summary: 'Deleted',

          detail: 'Transaction Deleted Successfully !!'

        })

      }
    })

  }

  saveTransaction() {

    if (
      this.transactionForm.invalid
    ) {
      return;
    }

    const value = this.transactionForm.value;

    const newTransaction = {

      id: 'TXN' + Date.now(),

        customerName: value.customerName ?? '',

        amount: value.amount ?? 0,

        status: value.status ??'PENDING',

        createdAt: new Date()

    };

    this.transactions.update(
      transactions => [
        ...transactions,
        newTransaction as any
      ]
    );

    this.dialogVisible.set(false);

    this.transactionForm.reset();

  }

}
