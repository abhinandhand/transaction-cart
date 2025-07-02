import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import localeNl from '@angular/common/locales/nl';
import { mockTransaction } from '../../../../../../mocks/app.mock';
import { BookkeppingStore } from '../../store/bookkeeping-store';
import { TransactionOverviewComponent } from './transaction-overview.component';

registerLocaleData(localeNl, 'nl-NL');

describe('TransactionOverviewComponent', () => {
  let component: TransactionOverviewComponent;
  let fixture: ComponentFixture<TransactionOverviewComponent>;
  let mockStore: jasmine.SpyObj<any>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('BookkeppingStore', ['addToCart', 'removeFromCart'], {
      entities: jasmine.createSpy().and.returnValue(mockTransaction)
    });

    await TestBed.configureTestingModule({
      imports: [TransactionOverviewComponent],
      providers: [{
        provide: BookkeppingStore,
        useValue: storeSpy
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionOverviewComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(BookkeppingStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transaction items when transactions exist', () => {
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    
    expect(transactionItems.length).toBe(3); 
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent.trim()).toBe('Transaction overview');
  });

  it('should display empty message when no transactions available', () => {
    Object.defineProperty(mockStore, 'entities', {
      value: jasmine.createSpy().and.returnValue([])
    });
    
    fixture.detectChanges();
    
    const emptyMessage = fixture.debugElement.query(By.css('li p'));
    expect(emptyMessage?.nativeElement.textContent.trim()).toBe('No transactions available.');
    
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    expect(transactionItems.length).toBe(0);
  });

  it('should call store methods when transaction item events are emitted', () => {
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    const firstTransactionItem = transactionItems[0];
    
    firstTransactionItem.triggerEventHandler('addToCart', null);
    expect(mockStore.addToCart).toHaveBeenCalledWith(mockTransaction[0]);
 
    firstTransactionItem.triggerEventHandler('removeFromCart', null);
    expect(mockStore.removeFromCart).toHaveBeenCalledWith(mockTransaction[0]);
  });
});
