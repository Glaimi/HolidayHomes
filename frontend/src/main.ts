/// <reference types="@angular/localize/init" />
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {registerLocaleData} from '@angular/common';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
