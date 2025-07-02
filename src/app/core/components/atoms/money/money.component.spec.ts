import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';

import { MoneyComponent } from './money.component';

registerLocaleData(localeNl, 'nl-NL');

describe('MoneyComponent', () => {
  let component: MoneyComponent;
  let fixture: ComponentFixture<MoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('amount', '5.0000');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
