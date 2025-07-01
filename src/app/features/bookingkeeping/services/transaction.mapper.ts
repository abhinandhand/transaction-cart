import {
  Transaction,
  TransactionResponse,
} from '../../../core/model/app.model';

export class TransactionMapper {
  mapTransactionData(data: TransactionResponse): Transaction[] {
    return data.transactions;
  }
}
