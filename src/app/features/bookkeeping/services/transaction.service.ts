import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Transaction,
  TransactionResponse,
} from '../../../core/model/app.model';
import { TransactionMapper } from './transaction.mapper';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);
  private transactionMapper = new TransactionMapper();

  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<TransactionResponse>('/api/transaction-cart-data.json')
      .pipe(
        map((response) => this.transactionMapper.mapTransactionData(response))
      );
  }
}
