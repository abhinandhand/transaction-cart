import { signal } from "@angular/core";
import { of } from "rxjs";
import { Transaction } from "../src/app/core/model/app.model";


export const mockTransaction: Transaction[] = [
     {
      "id": 1,
      "contractorName": "John Doe",
      "accountNumber": "RBO4567890",
      "amountPaid": 5000
    },
    {
      "id": 2,
      "contractorName": "Jane Smith",
      "accountNumber": "RBO7654321",
      "amountPaid": 3000
    },
    {
      "id": 3,
      "contractorName": "Bob Johnson",
      "accountNumber": "RBB2334455",
      "amountPaid": 7000
    }
]


export class MockTransactionService {
  getTransactions() {
    return of(mockTransaction);
  }
}

export const mockBookKeepingStore = {
    isLoading: signal(false),
    error: signal(null),
    entities: () => signal(mockTransaction),
    cartTransactions:  signal([] as Transaction[]),
    totalCartValue: signal(0),
    addToCart: () => { /* mock implementation */ },
    removeFromCart: () => { /* mock implementation */ },
    loadTransactions: () => { /* mock implementation */ },
} 

export class MockBookKeepingStore {
  isLoading = signal(false);
  error = signal(null);
  entities = signal(mockTransaction);
  cartTransactions = signal([] as Transaction[]);
  totalCartValue = signal(0);

  addToCart = jasmine.createSpy('addToCart');
  removeFromCart = jasmine.createSpy('removeFromCart');
  loadTransactions = jasmine.createSpy('loadTransactions');
}
