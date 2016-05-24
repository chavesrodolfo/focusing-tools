import { Component } from '@angular/core';
import { HomeComponent } from './+home';
import { Routes, ROUTER_DIRECTIVES} from '@angular/router';
import { AuthUser } from './interfaces/interfaces';
import { AboutComponent } from './+about';
import { StatsComponent } from './+stats';
import { DataService, AuthService, TimerService, NotificationService } from './shared';
import { FocusUserImageComponent } from './shared/components/focus-user-image';

// import 'rxjs/add/operator/share'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/operator/of';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'focus-app',
  templateUrl: 'focus.component.html',
  styleUrls: ['focus.component.css'],
  directives: [ROUTER_DIRECTIVES, FocusUserImageComponent],
  providers: [DataService, AuthService, TimerService, NotificationService]
})
@Routes([
  { path: '/', component: HomeComponent },
  { path: '/about', component: AboutComponent },
  { path: '/stats', component: StatsComponent }
])
export class FocusAppComponent {
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
