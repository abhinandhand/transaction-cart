import { Component, inject } from '@angular/core';
import { BookkeppingStore } from '../../store/bookkeeping-store';
import { TransactionItemComponent } from '../../../../core/components/molecules/transaction-item/transaction-item.component';
import { RouterLink } from '@angular/router';
import { MoneyComponent } from '../../../../core/components/atoms/money/money.component';

@Component({
  selector: 'app-transaction-cart',
  imports: [TransactionItemComponent, RouterLink, MoneyComponent],
  templateUrl: './transaction-cart.component.html',
  styleUrl: './transaction-cart.component.scss'
})
export class TransactionCartComponent {
  readonly bookKeepingStore = inject(BookkeppingStore);
}
