import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isLoggedIn: Observable<boolean>;

  constructor(public angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
    this.isLoggedIn = this.angularFireAuth.authState.map(auth => auth && !!auth.uid);
  }

  loginGoogle() {
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
