import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './common/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;
  profileImg: Observable<string>;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.profileImg = this.authService.auth.map(auth => auth ? auth.auth.photoURL : '/assets/images/icon.png');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
