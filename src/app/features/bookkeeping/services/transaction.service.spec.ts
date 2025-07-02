import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionResponse } from '../../../core/model/app.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  const mockTransactionResponse: TransactionResponse = {
    transactions: [
      { id: 1, contractorName: 'John Doe', accountNumber: 'ACC123', amountPaid: 1000 },
      { id: 2, contractorName: 'Jane Smith', accountNumber: 'ACC456', amountPaid: 2000 }
    ]
  };

  const expectedTransactions: Transaction[] = [
    { id: 1, contractorName: 'John Doe', accountNumber: 'ACC123', amountPaid: 1000 },
    { id: 2, contractorName: 'Jane Smith', accountNumber: 'ACC456', amountPaid: 2000 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('should fetch transactions from correct API endpoint', () => {
      service.getTransactions().subscribe();

      const req = httpMock.expectOne('/api/transaction-cart-data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTransactionResponse);
    });

    it('should return mapped transaction data', () => {
      service.getTransactions().subscribe(transactions => {
        expect(transactions).toEqual(expectedTransactions);
        expect(transactions.length).toBe(2);
        expect(transactions[0].contractorName).toBe('John Doe');
      });

      const req = httpMock.expectOne('/api/transaction-cart-data.json');
      req.flush(mockTransactionResponse);
    });

    it('should handle HTTP errors gracefully', () => {
      service.getTransactions().subscribe({
        next: () => fail('Should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne('/api/transaction-cart-data.json');
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });

    it('should handle empty response data', () => {
      const emptyResponse: TransactionResponse = { transactions: [] };

      service.getTransactions().subscribe(transactions => {
        expect(transactions).toEqual([]);
        expect(transactions.length).toBe(0);
      });

      const req = httpMock.expectOne('/api/transaction-cart-data.json');
      req.flush(emptyResponse);
    });

    it('should use TransactionMapper to transform data', () => {
      spyOn(service['transactionMapper'], 'mapTransactionData').and.returnValue(expectedTransactions);

      service.getTransactions().subscribe(transactions => {
        expect(service['transactionMapper'].mapTransactionData).toHaveBeenCalledWith(mockTransactionResponse);
        expect(transactions).toEqual(expectedTransactions);
      });

      const req = httpMock.expectOne('/api/transaction-cart-data.json');
      req.flush(mockTransactionResponse);
    });
  });

});
