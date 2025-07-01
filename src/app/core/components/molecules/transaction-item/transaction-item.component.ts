import { Component, input, output } from '@angular/core';
import { NameBadgeComponent } from '../../atoms/name-badge/name-badge.component';
import { MoneyComponent } from '../../atoms/money/money.component';
import { Transaction } from '../../../model/app.model';

@Component({
  selector: 'app-transaction-item',
  imports: [NameBadgeComponent, MoneyComponent],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  mode = input<'overview' | 'cart'>('overview');
  data = input.required<Transaction>();
  
  addToCart = output<void>();
  removeFromCart = output<void>();
}
