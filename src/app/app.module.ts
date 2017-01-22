import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

import { routes } from './app.routes';
import { AuthGuard } from './app.guards';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { NotificationService } from './shared/services/notification.service';
import { TimerService } from './shared/services/timer.service';
import { FocusPhasePipe } from './shared/pipes/focus-phase.pipe';
import { FocusPhaseComponent } from './shared/components/focus-phase/focus-phase.component';
import { FocusTimerComponent } from './shared/components/focus-timer/focus-timer.component';
import { FocusUserImageComponent } from './shared/components/focus-user-image/focus-user-image.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StatsComponent } from './stats/stats.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyADlZISFyOfjX1g9K7gF3J1U9QBqyYN0kY',
  authDomain: 'focus-app.firebaseapp.com',
  databaseURL: 'https://focus-app.firebaseio.com',
  storageBucket: 'firebase-focus-app.appspot.com'
};

const myFirebaseAuthConfig = {
  providers: [AuthProviders.Twitter, AuthProviders.Github],
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    FocusPhaseComponent,
    FocusTimerComponent,
    FocusUserImageComponent,
    HomeComponent,
    AboutComponent,
    StatsComponent,
    FocusPhasePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataService,
    NotificationService,
    TimerService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
