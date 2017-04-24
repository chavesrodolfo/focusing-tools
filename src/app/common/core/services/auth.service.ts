import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';

@Injectable()
export class AuthService {
  auth: AngularFireAuth;
  isLoggedIn: Observable<boolean>;

  constructor(public angularFire: AngularFire) {
    this.auth = this.angularFire.auth;
    this.isLoggedIn = this.angularFire.auth.map(auth => auth && !!auth.uid);
  }

  loginGoogle() {
    this.angularFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect,
    });
  }

  logout() {
    this.angularFire.auth.logout();
  }
}
