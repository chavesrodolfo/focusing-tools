import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2';

import { AuthService } from './../common/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  auth: AngularFireAuth;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth = this.authService.auth;

    this.authSubscription = this.authService.isLoggedIn
      .subscribe(loggedIn => this.router.navigate(['history']));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  logout() {
    this.authService.logout();
  }
}
