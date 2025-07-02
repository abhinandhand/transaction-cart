import { signalStore, withHooks } from '@ngrx/signals';
import { withBookkeepingStoreFeature } from './bookkeeping-store.feature';

export const BookkeppingStore = signalStore(
  { providedIn: 'root' },
  withBookkeepingStoreFeature(),
  withHooks((store) => {
    return {
      onInit() {
        store.loadTransactions();
      },
    };
  })
);
