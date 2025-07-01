import { Routes } from '@angular/router';
import { bookkeepingRoutes } from './features/bookingkeeping/bookkeeping.routes';
import { PageNotFoundComponent } from './core/components/molecules/page-not-found/page-not-found.component';

export const routes: Routes = [
  ...bookkeepingRoutes,
  {
    path: '**',
    title: 'Bookkeeping - Page not found',
    component: PageNotFoundComponent,
  },
];
