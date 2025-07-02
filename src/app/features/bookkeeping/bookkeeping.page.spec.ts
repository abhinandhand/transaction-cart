import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { mockBookKeepingStore, mockTransaction } from '../../../../mocks/app.mock';
import { BookkeepingPageComponent } from './bookkeeping.page';
import { TransactionService } from './services/transaction.service';
import { BookkeppingStore } from './store/bookkeeping-store';


@Component({
  selector: 'app-navbar',
  template: '<nav>Cart: {{cartItemCount()}}</nav>',
  standalone: true,
})
class MockNavbarComponent {
  cartItemCount = input<number>(0);
}

@Component({
  selector: 'app-loader',
  template: '<div>Loading...</div>',
  standalone: true,
})
class MockLoaderComponent {}

@Component({
  selector: 'app-http-error',
  template: '<div>Error: {{error?.message}}</div>',
  standalone: true,
})
class MockHttpErrorComponent {
  error: HttpErrorResponse | null = null;
}

@Component({
  selector: 'app-router-outlet',
  template: '<div>Router Content</div>',
  standalone: true,
})
class MockRouterOutletComponent {}



describe('BookkeepingPageComponent', () => {
  let component: BookkeepingPageComponent;
  let fixture: ComponentFixture<BookkeepingPageComponent>;
  const mockStore = mockBookKeepingStore;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        BookkeepingPageComponent,
        RouterModule.forRoot([]),
        MockNavbarComponent,
        MockLoaderComponent,
        MockHttpErrorComponent,
        MockRouterOutletComponent,
      ],
      providers: [
        TransactionService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .overrideComponent(BookkeepingPageComponent, {
      set: {
        imports: [
          MockRouterOutletComponent,
          MockLoaderComponent,
          MockHttpErrorComponent,
          MockNavbarComponent,
          RouterOutlet
        ],
        providers:[{
          provide: BookkeppingStore,
          useValue: mockStore
        }]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookkeepingPageComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization and State Management', () => {
    it('should create component and inject store correctly', () => {
      expect(component).toBeTruthy();
      expect(component.bookkeepingStore).toBeTruthy();
    });

    it('should render navbar with correct cart count when cart is empty', () => {
      mockStore.cartTransactions.set([]);
      fixture.detectChanges();

      const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
      expect(navbarElement).toBeTruthy();
      expect(navbarElement.nativeElement.textContent).toContain('Cart: 0');
    });

     it('should render navbar with correct cart count when cart has items', () => {

      mockStore.cartTransactions.set([mockTransaction[0], mockTransaction[1]]);
      fixture.detectChanges();

      const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
      expect(navbarElement.nativeElement.textContent).toContain('Cart: 2');
    });
  });

  // describe('Loading State Handling', () => {
  //   it('should show loader when isLoading is true', () => {
  //     mockStore.isLoading.set(true);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();

  //     const loaderElement = fixture.debugElement.query(By.css('app-loader'));
  //     const routerOutletElement = fixture.debugElement.query(By.css('app-router-outlet'));
  //     const errorElement = fixture.debugElement.query(By.css('app-http-error'));

  //     expect(loaderElement).toBeTruthy();
  //     expect(loaderElement.nativeElement.textContent).toContain('Loading...');
  //     expect(routerOutletElement).toBeFalsy();
  //     expect(errorElement).toBeFalsy();
  //   });

  //   it('should hide loader and show router-outlet when loading is complete', () => {
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();

  //     const loaderElement = fixture.debugElement.query(By.css('app-loader'));
  //     const routerOutletElement = fixture.debugElement.query(By.css('app-router-outlet'));

  //     expect(loaderElement).toBeFalsy();
  //     expect(routerOutletElement).toBeTruthy();
  //     expect(routerOutletElement.nativeElement.textContent).toContain('Router Content');
  //   });
  // });

  // describe('Error State Handling', () => {
  //   it('should show error component when error exists', () => {
  //     const mockError = new HttpErrorResponse({
  //       error: 'Network error',
  //       status: 500,
  //       statusText: 'Internal Server Error'
  //     });
      
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(mockError);
  //     fixture.detectChanges();

  //     const errorElement = fixture.debugElement.query(By.css('app-http-error'));
  //     const routerOutletElement = fixture.debugElement.query(By.css('app-router-outlet'));
  //     const loaderElement = fixture.debugElement.query(By.css('app-loader'));

  //     expect(errorElement).toBeTruthy();
  //     expect(routerOutletElement).toBeFalsy();
  //     expect(loaderElement).toBeFalsy();
  //   });

  //   it('should prioritize error over loading state', () => {
  //     const mockError = new HttpErrorResponse({
  //       error: 'Network error',
  //       status: 404,
  //       statusText: 'Not Found'
  //     });
      
  //     mockStore.isLoading.set(true); // Both loading and error
  //     mockStore.error.set(mockError);
  //     fixture.detectChanges();

  //     const errorElement = fixture.debugElement.query(By.css('app-http-error'));
  //     const loaderElement = fixture.debugElement.query(By.css('app-loader'));
  //     const routerOutletElement = fixture.debugElement.query(By.css('app-router-outlet'));

  //     expect(errorElement).toBeTruthy();
  //     expect(loaderElement).toBeFalsy();
  //     expect(routerOutletElement).toBeFalsy();
  //   });
  // });

  // describe('Template Structure and Accessibility', () => {
  //   it('should have proper semantic HTML structure', () => {
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();

  //     const mainElement = fixture.debugElement.query(By.css('main'));
  //     expect(mainElement).toBeTruthy();
  //     expect(mainElement.nativeElement.tagName.toLowerCase()).toBe('main');
  //     expect(mainElement.nativeElement.classList).toContain('page-container');
  //     expect(mainElement.nativeElement.classList).toContain('container-lg');
  //     expect(mainElement.nativeElement.classList).toContain('p-4');
  //   });

  //   it('should render all required components in correct order', () => {
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();

  //     const allElements = fixture.debugElement.queryAll(By.css('*'));
  //     const componentSelectors = allElements.map(el => el.nativeElement.tagName.toLowerCase());

  //     expect(componentSelectors).toContain('app-navbar');
  //     expect(componentSelectors).toContain('main');
  //     expect(componentSelectors).toContain('app-router-outlet');
  //   });
  // });

  // describe('Edge Cases and Dynamic State Changes', () => {
  //   it('should handle rapid state changes correctly', () => {
  //     // Start with loading
  //     mockStore.isLoading.set(true);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();
  //     expect(fixture.debugElement.query(By.css('app-loader'))).toBeTruthy();

  //     // Switch to error
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(new HttpErrorResponse({ status: 500 }));
  //     fixture.detectChanges();
  //     expect(fixture.debugElement.query(By.css('app-http-error'))).toBeTruthy();

  //     // Switch to success
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();
  //     expect(fixture.debugElement.query(By.css('app-router-outlet'))).toBeTruthy();
  //   });

  //   it('should handle cart count changes dynamically', () => {
  //     // Start with empty cart
  //     mockStore.cartTransactions.set([]);
  //     fixture.detectChanges();
  //     let navbarElement = fixture.debugElement.query(By.css('app-navbar'));
  //     expect(navbarElement.nativeElement.textContent).toContain('Cart: 0');

  //     // Add items to cart
  //     mockStore.cartTransactions.set([mockTransaction[0]]);
  //     fixture.detectChanges();
  //     navbarElement = fixture.debugElement.query(By.css('app-navbar'));
  //     expect(navbarElement.nativeElement.textContent).toContain('Cart: 1');

  //     // Add more items
  //     mockStore.cartTransactions.set(mockTransaction);
  //     fixture.detectChanges();
  //     navbarElement = fixture.debugElement.query(By.css('app-navbar'));
  //     expect(navbarElement.nativeElement.textContent).toContain('Cart: 2');
  //   });

  //   it('should handle null/undefined error gracefully', () => {
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();

  //     expect(() => fixture.detectChanges()).not.toThrow();
  //     expect(fixture.debugElement.query(By.css('app-router-outlet'))).toBeTruthy();
  //   });
  // });

  // describe('Store Integration', () => {
  //   it('should access store properties without errors', () => {
  //     expect(() => {
  //       component.bookkeepingStore.isLoading();
  //       component.bookkeepingStore.error();
  //       component.bookkeepingStore.cartTransactions();
  //     }).not.toThrow();
  //   });

  //   it('should handle store method calls', () => {
  //     expect(component.bookkeepingStore.addToCart).toBeDefined();
  //     expect(component.bookkeepingStore.removeFromCart).toBeDefined();
  //     expect(component.bookkeepingStore.loadTransactions).toBeDefined();
  //   });

  //   it('should verify store methods are callable', () => {
  //     expect(typeof component.bookkeepingStore.addToCart).toBe('function');
  //     expect(typeof component.bookkeepingStore.removeFromCart).toBe('function');
  //     expect(typeof component.bookkeepingStore.loadTransactions).toBe('function');
  //   });
  // });

  // describe('Component State Reactivity', () => {
  //   it('should react to store signal changes', () => {
  //     // Initial state
  //     mockStore.isLoading.set(false);
  //     mockStore.error.set(null);
  //     fixture.detectChanges();
      
  //     expect(fixture.debugElement.query(By.css('app-router-outlet'))).toBeTruthy();

  //     // Change to loading
  //     mockStore.isLoading.set(true);
  //     fixture.detectChanges();
      
  //     expect(fixture.debugElement.query(By.css('app-loader'))).toBeTruthy();
  //     expect(fixture.debugElement.query(By.css('app-router-outlet'))).toBeFalsy();
  //   });

  //   it('should handle multiple simultaneous cart updates', () => {
  //     mockStore.cartTransactions.set([]);
  //     fixture.detectChanges();
      

  //     mockStore.cartTransactions.set([mockTransaction[0]]);
  //     fixture.detectChanges();
      
  //     mockStore.cartTransactions.set([mockTransaction[0], mockTransaction[1]]);
  //     fixture.detectChanges();
      
  //     const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
  //     expect(navbarElement.nativeElement.textContent).toContain('Cart: 2');
  //   });
  // });
});
