import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { Transaction } from '../../../core/model/app.model';
import { TransactionService } from '../services/transaction.service';
import { BookkeepingState } from './bookkeeping-store.state';
import { HttpErrorResponse } from '@angular/common/http';

export function withBookkeepingStoreFeature() {
  return signalStoreFeature(
    {
      state: type<BookkeepingState>(),
    },
    withEntities<Transaction>(),
    withMethods((store) => {
      const _transactionService = inject(TransactionService);

      const loadTransactions = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            _transactionService.getTransactions().pipe(
              tap((transactions) => loadTransactionsSuccess(transactions)),
              catchError((error) => loadTransactionsFailure(error))
            )
          )
        )
      );

      const loadTransactionsSuccess = (transactions: Transaction[]) => {
        patchState(store, { isLoading: false, transactions });
      };

      const loadTransactionsFailure = (error: HttpErrorResponse) => {
        patchState(store, { isLoading: false, error });
        return EMPTY;
      };

      return {
        loadTransactions,
      };
    })
  );
}
