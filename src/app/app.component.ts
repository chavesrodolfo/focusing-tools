import { Component } from '@angular/core';
import { HomeComponent } from './+home';
import { ROUTER_DIRECTIVES} from '@angular/router';

import {
  DataService,
  AuthService,
  TimerService,
  NotificationService
} from './shared';

import { FocusUserImageComponent } from './shared/components/focus-user-image';

import { AuthUser } from './interfaces/interfaces';

// import 'rxjs/add/operator/share'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/operator/of';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, FocusUserImageComponent],
  providers: [DataService, AuthService, TimerService, NotificationService]
})
export class AppComponent {
  title = 'focus works!';
  authUser: AuthUser;
  navOpen: boolean;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.authUser$.subscribe(user => this.authUser = user);
    this.navOpen = false;
  }

  logout() {
    this._authService.logout();
  }
}