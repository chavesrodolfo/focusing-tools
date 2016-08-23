import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    return Observable.of(true);
    //return this.authService.authUser.map(user => {
      // if (user) {
      //   return Observable.of(true);
      // } else {
      //   this.router.navigate(['/login']);
      //   return Observable.of(false);
      // }
    //});
  }
}
