import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { signalStore } from "@ngrx/signals";
import { mockTransaction, MockTransactionService } from "../../../../../mocks/app.mock";
import { TransactionService } from "../services/transaction.service";
import { withBookkeepingStoreFeature } from "./bookkeeping-store.feature";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

describe('BookkeepingStore Feature', () => {
    const BookkeepingStore = signalStore({ providedIn: 'root' }, withBookkeepingStoreFeature());
    const mockTransactionService = new MockTransactionService();


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{
                provide: TransactionService,
                useValue: mockTransactionService
            }]
        });
    });

    it('should create the store with initial state', () => {
        const store = TestBed.inject(BookkeepingStore);
        expect(store).toBeDefined();
    });

    it('should have initial state with isLoading false and no transactions', () => {
        const store = TestBed.inject(BookkeepingStore);
        expect(store.isLoading()).toBeFalse();
        expect(store.entities().length).toBe(0);
    });

    it('should load transactions successfully', fakeAsync(() => {
        const getTransactionSpy = spyOn(mockTransactionService, 'getTransactions').and.callThrough();
        const store = TestBed.inject(BookkeepingStore);
        store.loadTransactions();

        tick();

        expect(getTransactionSpy).toHaveBeenCalled();
        expect(store.isLoading()).toBeFalse();
        expect(store.entities().length).toBe(mockTransaction.length); 
    }));


    it('should handle error when loading transactions fails', fakeAsync(() => {
        const errorResponse = new HttpErrorResponse({
            error: 'Error loading transactions',
            status: 500,});

        spyOn(mockTransactionService, 'getTransactions').and.returnValue(throwError(() => errorResponse));
        const store = TestBed.inject(BookkeepingStore);


        store.loadTransactions();
        tick();

        expect(store.isLoading()).toBeFalse();
        expect(store.error()).toEqual(errorResponse);
        expect(store.entities().length).toBe(0);
    }));

    it('should add transaction to cart', fakeAsync(() => {
         spyOn(mockTransactionService, 'getTransactions').and.callThrough();
        const store = TestBed.inject(BookkeepingStore);
        store.loadTransactions();

        tick();

        const transaction = mockTransaction[0];
        store.addToCart(transaction);
        const updatedTransaction = store.entities().find(t => t.id === transaction.id);

    
        expect(updatedTransaction?.isAddedToCart).toBeTrue();
    }));

    it('should remove transaction from cart', fakeAsync(() => {
        spyOn(mockTransactionService, 'getTransactions').and.callThrough();
        const store = TestBed.inject(BookkeepingStore);
        store.loadTransactions();

        tick();

        const transaction = mockTransaction[0];
        store.addToCart(transaction);
        store.removeFromCart(transaction);
        const updatedTransaction = store.entities().find(t => t.id === transaction.id);

        expect(updatedTransaction?.isAddedToCart).toBeFalse();
    }));


    describe('Computed properties', () => {
        let store: any;

        beforeEach(fakeAsync(() => {
            store = TestBed.inject(BookkeepingStore);
            spyOn(mockTransactionService, 'getTransactions').and.callThrough();
            store.loadTransactions();
            tick();
        }));

        it('should compute cart transactions correctly', () => {
            const cartTransactions = store.cartTransactions();
            expect(cartTransactions.length).toBe(0);

            const transaction = mockTransaction[0];
            store.addToCart(transaction);
            const updatedCartTransactions = store.cartTransactions();

            expect(updatedCartTransactions.length).toBe(1);
            expect(updatedCartTransactions[0].id).toBe(transaction.id);
        });

        it('should compute total cart value correctly', () => {
            const totalCartValue = store.totalCartValue();
            expect(totalCartValue).toBe(0);

            const transaction1 = mockTransaction[0];
            const transaction2 = mockTransaction[1];
            store.addToCart(transaction1);
            store.addToCart(transaction2);

            const updatedTotalCartValue = store.totalCartValue();
            expect(updatedTotalCartValue).toBe(transaction1.amountPaid + transaction2.amountPaid);
        });
    }
    );
});