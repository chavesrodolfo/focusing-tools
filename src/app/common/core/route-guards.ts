import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Injectable()
export class  AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap(isLoggedIn => this.redirectIfNeeded(isLoggedIn))
    );
  }

  private redirectIfNeeded(isLoggedIn) {
    if (!isLoggedIn) {
      this.router.navigate(['login']);
    }
  }
}
