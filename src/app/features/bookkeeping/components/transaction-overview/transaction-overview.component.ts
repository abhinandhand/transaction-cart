import { Component, inject } from '@angular/core';
import { TransactionItemComponent } from '../../../../core/components/molecules/transaction-item/transaction-item.component';
import { BookkeppingStore } from '../../store/bookkeeping-store';

@Component({
  selector: 'app-transaction-overview',
  imports: [TransactionItemComponent],
  templateUrl: './transaction-overview.component.html',
  styleUrl: './transaction-overview.component.scss'
})
export class TransactionOverviewComponent {

 readonly bookKeepingStore = inject(BookkeppingStore);

}
