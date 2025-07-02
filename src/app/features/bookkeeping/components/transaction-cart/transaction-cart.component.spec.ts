import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { mockTransaction } from '../../../../../../mocks/app.mock';
import { BookkeppingStore } from '../../store/bookkeeping-store';
import { TransactionCartComponent } from './transaction-cart.component';

registerLocaleData(localeNl, 'nl-NL');

describe('TransactionCartComponent', () => {
  let component: TransactionCartComponent;
  let fixture: ComponentFixture<TransactionCartComponent>;
  let mockStore: any;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('BookkeppingStore', ['removeFromCart'], {
      cartTransactions: jasmine.createSpy().and.returnValue(mockTransaction),
      totalCartValue: jasmine.createSpy().and.returnValue(15000)
    });

    await TestBed.configureTestingModule({
      imports: [
        TransactionCartComponent,
        RouterModule.forRoot([])
        ],
      providers: [{
        provide: BookkeppingStore,
        useValue: storeSpy
      },
    {
      provide: ActivatedRoute,
      useValue: {} as Partial<ActivatedRoute>
    }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCartComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(BookkeppingStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items when cart has transactions', () => {
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    const cartTitle = fixture.debugElement.query(By.css('h1'));
    
    expect(transactionItems.length).toBe(mockTransaction.length);
    expect(cartTitle.nativeElement.textContent.trim()).toBe('Transaction cart');
    expect(mockStore.cartTransactions).toHaveBeenCalled();
  });

  it('should display empty cart message when no items in cart', () => {
    mockStore.cartTransactions.and.returnValue([]);
    fixture.detectChanges();
    
    const emptyMessage = fixture.debugElement.query(By.css('p[aria-live="polite"]'));
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    
    expect(emptyMessage?.nativeElement.textContent.trim()).toContain('No transaction in the cart');
    expect(transactionItems.length).toBe(0);
  });

  it('should display total cart value and handle remove events', () => {
    const totalElement = fixture.debugElement.query(By.css('app-money'));
    const transactionItems = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    
    expect(totalElement).toBeTruthy();
    expect(mockStore.totalCartValue).toHaveBeenCalled();
    
    const firstTransactionItem = transactionItems[0];
    firstTransactionItem.triggerEventHandler('removeFromCart', null);
    expect(mockStore.removeFromCart).toHaveBeenCalledWith(mockTransaction[0]);
  });

  it('should have correct navigation link to overview page', () => {
    const backLink = fixture.debugElement.query(By.css('a.back-link[routerLink="/"]'));
    const backIcon = fixture.debugElement.query(By.css('a.back-link i.bi-arrow-left'));
    
    expect(backLink).toBeTruthy();
    expect(backLink.nativeElement.getAttribute('routerLink')).toBe('/');
    expect(backLink.nativeElement.textContent.trim()).toBe('To overview');
    expect(backIcon).toBeTruthy();
  });

 
  it('should handle edge cases for cart total values', () => {

    mockStore.totalCartValue.and.returnValue(0);
    fixture.detectChanges();
    
    let totalElement = fixture.debugElement.query(By.css('app-money'));
    expect(totalElement).toBeTruthy();
    expect(mockStore.totalCartValue).toHaveBeenCalled();
    
    mockStore.totalCartValue.and.returnValue(-5000);
    fixture.detectChanges();
    
    totalElement = fixture.debugElement.query(By.css('app-money'));
    expect(totalElement).toBeTruthy();
    expect(mockStore.totalCartValue).toHaveBeenCalled();

    const totalContainer = fixture.debugElement.query(By.css('.cart-total'));
    const totalLabel = fixture.debugElement.query(By.css('.cart-total .fw-bold'));
    
    expect(totalContainer).toBeTruthy();
    expect(totalContainer.nativeElement.classList).toContain('cart-total');
    expect(totalLabel.nativeElement.textContent.trim()).toBe('TOTAL:');
    
    expect(totalElement.attributes['ng-reflect-amount']).toBe('5000');
    expect(totalElement.attributes['ng-reflect-show-symbol']).toBe('true');
  });
});
