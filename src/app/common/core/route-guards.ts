import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './services/auth.service';

@Injectable()
export class  AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn
      .do(isLoggedIn => this.redirectIfNeeded(isLoggedIn));
  }

  private redirectIfNeeded(isLoggedIn) {
    if (!isLoggedIn) {
      this.router.navigate(['login']);
    }
  }
}
