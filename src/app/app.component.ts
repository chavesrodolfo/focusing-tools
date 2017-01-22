import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { AuthUser } from './interfaces/interfaces';

// import 'rxjs/add/operator/share'; 
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/operator/of';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'focus works!';
  authUser: AuthUser;
  navOpen: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authUser.subscribe(user => this.authUser = user);
    this.navOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}