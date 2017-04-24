import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from './services/auth.service';
import { TimerService } from './services/timer.service';
import { HistoryService } from './services/history.service';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from './route-guards';

const firebaseConfig = {
  apiKey: 'AIzaSyBjpfpwIXBRVDbhcEJIrbYrky28EymohMA',
  authDomain: 'ng-focus.firebaseapp.com',
  databaseURL: 'https://ng-focus.firebaseio.com',
  storageBucket: 'ng-focus.appspot.com'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        AuthService,
        TimerService,
        NotificationService,
        HistoryService
      ]
    };
  }
}
