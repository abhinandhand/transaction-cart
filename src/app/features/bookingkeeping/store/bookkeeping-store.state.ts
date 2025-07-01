import { HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../../../core/model/app.model';

export interface BookkeepingState {
  isLoading: boolean;
  error: HttpErrorResponse | null;
  transactions: Transaction[];
}

const intialBookkeepingState: BookkeepingState = {
  isLoading: false,
  error: null,
  transactions: [],
};

export function initialiseBookkeepingFactory(): BookkeepingState {
  return { ...intialBookkeepingState };
}
