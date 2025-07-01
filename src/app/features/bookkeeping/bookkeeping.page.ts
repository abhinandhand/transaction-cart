import { Component, inject } from '@angular/core';
import { BookkeppingStore } from './store/bookkeeping-store';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../core/components/atoms/loader/loader.component';
import { HttpErrorComponent } from '../../core/components/atoms/http-error/http-error.component';
import { NavbarComponent } from '../../core/components/molecules/navbar/navbar.component';

@Component({
  selector: 'app-bookingkeeping',
  imports: [RouterOutlet, LoaderComponent, HttpErrorComponent, NavbarComponent],
  templateUrl: './bookkeeping.page.html',
  styleUrl: './bookkeeping.page.scss',
  providers: [BookkeppingStore],
})
export class BookkeepingPageComponent {
  readonly bookkeepingStore = inject(BookkeppingStore);
}
