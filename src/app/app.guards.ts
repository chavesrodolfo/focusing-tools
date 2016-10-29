import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    return this.authService.authUser.map(user => {
      // console.log(user);
      if (user) {
        console.log(1);
        return true;
      } else {
        console.log(2);
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
