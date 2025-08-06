/// <reference types="@angular/localize/init" />
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {registerLocaleData} from '@angular/common';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withJsonpSupport())
  ]
})
  .catch((err) => console.error(err));

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
