import { Component, inject } from '@angular/core';
import { BookkeppingStore } from './store/bookkeeping-store';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../core/components/atoms/loader/loader.component';

@Component({
  selector: 'app-bookingkeeping',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './bookkeeping.page.html',
  styleUrl: './bookkeeping.page.scss',
  providers: [BookkeppingStore],
})
export class BookkeepingPageComponent {
  readonly bookkeepingStore = inject(BookkeppingStore);
}
