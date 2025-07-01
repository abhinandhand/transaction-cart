import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-money',
  imports: [CurrencyPipe],
  templateUrl: './money.component.html',
  styleUrl: './money.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }],
})
export class MoneyComponent {
  amount = input.required<number>();
  showSymbol = input<boolean>(false);
  currency = input<string>('EUR');

}
