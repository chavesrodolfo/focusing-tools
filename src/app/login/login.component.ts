import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';

import { AuthService } from './../common/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: Observable<firebase.User>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;

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
