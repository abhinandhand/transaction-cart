import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeNl, 'nl-NL');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
