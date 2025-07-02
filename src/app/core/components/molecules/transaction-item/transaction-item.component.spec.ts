import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';

import { TransactionItemComponent } from './transaction-item.component';
import { mockTransaction } from '../../../../../../mocks/app.mock';

registerLocaleData(localeNl, 'nl-NL');

describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionItemComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mode', 'overview'); 
    fixture.componentRef.setInput('data', mockTransaction[0])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
