import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';

import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://focus-app.firebaseio.com'),
  firebaseAuthConfig({
    provider: AuthProviders.Twitter,
    method: AuthMethods.Popup,
    remember: 'default',
    scope: ['email']
  })
]);