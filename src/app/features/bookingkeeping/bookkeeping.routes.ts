import { Routes } from '@angular/router';
import { TransactionOverviewComponent } from './components/transaction-overview/transaction-overview.component';
import { BookkeepingPageComponent } from './bookkeeping.page';

export const bookkeepingRoutes: Routes = [
  {
    path: '',
    title: 'Bookkeeping',
    component: BookkeepingPageComponent,
    children: [
      {
        path: '',
        title: 'Bookkeeping - Transaction overview',
        component: TransactionOverviewComponent,
      },

      {
        path: 'cart',
        title: 'Bookkeeping - Transaction Cart',
        loadComponent: () =>
          import(
            './components/transaction-cart/transaction-cart.component'
          ).then((m) => m.TransactionCartComponent),
      },
    ],
  },
];
