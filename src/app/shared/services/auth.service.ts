import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { AuthProviders, AngularFire, AngularFireAuth } from 'angularfire2';

import { AuthUser, AuthType } from '../../interfaces/interfaces';

@Injectable()
export class AuthService {
  authUser: Observable<any>;

  constructor(private angularFire: AngularFire, private angularFireAuth: AngularFireAuth) {
    this.authUser = this.angularFire.auth;
  }

  login(authType: AuthType) {
    if (authType === AuthType.TWITTER) {
      return this.firebaseLogin(AuthProviders.Twitter);
    } else if (authType === AuthType.GITHUB) {
      return this.firebaseLogin(AuthProviders.Github);
    }
  }

  logout() {
    this.angularFire.auth.logout();
  }

  private firebaseLogin(authType: AuthProviders) {
    return this.angularFire.auth.login({
      provider: authType,
    }).then((authData: any) => {
      authData.auth.token.firebase = null; // remove array
      this.angularFire.database.object('/users/' + authData.uid + '/authData').set(authData);
    }).catch(err => console.log('Login Failed', err));
  }
}
