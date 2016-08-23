import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';

import { routes } from './app.routes';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { NotificationService } from './shared/services/notification.service';
import { TimerService } from './shared/services/timer.service';
import { FocusPhasePipe } from './shared/pipes/focus-phase.pipe';
import { FocusPhaseComponent } from './shared/components/focus-phase';
import { FocusTimerComponent } from './shared/components/focus-timer';
import { FocusUserImageComponent } from './shared/components/focus-user-image';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StatsComponent } from './stats';
import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyADlZISFyOfjX1g9K7gF3J1U9QBqyYN0kY',
  authDomain: 'focus-app.firebaseapp.com',
  databaseURL: 'https://focus-app.firebaseio.com',
  storageBucket: 'firebase-focus-app.appspot.com'
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
    FocusPhasePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
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
