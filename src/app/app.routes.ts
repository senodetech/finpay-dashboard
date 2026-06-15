import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./features/transactions/pages/transactions/transactions').then(m => m.Transactions)
}];
