import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withBookkeepingStoreFeature } from './bookkeeping-store.feature';
import {
  BookkeepingState,
  initialiseBookkeepingFactory,
} from './bookkeeping-store.state';

export const BookkeppingStore = signalStore(
  withState<BookkeepingState>(initialiseBookkeepingFactory),
  withBookkeepingStoreFeature(),
  withHooks((store) => {
    return {
      onInit() {
        console.log('Bookkeeping Store Initialized');
        store.loadTransactions();
      },
    };
  })
);
