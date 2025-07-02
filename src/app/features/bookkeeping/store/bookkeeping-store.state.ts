import { HttpErrorResponse } from '@angular/common/http';

export interface BookkeepingState {
  isLoading: boolean;
  error: HttpErrorResponse | null;
}

const intialBookkeepingState: BookkeepingState = {
  isLoading: false,
  error: null
};

export function initialiseBookkeepingFactory(): BookkeepingState {
  return { ...intialBookkeepingState };
}
