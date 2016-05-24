import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { FirebaseAuth, AuthProviders, AngularFire } from 'angularfire2';

import { AuthUser, AuthType } from '../../interfaces/interfaces';

@Injectable()
export class AuthService {
	authUser$: Observable<any>;

    constructor(private firebaseAuth: FirebaseAuth, private angularFire: AngularFire) {
		this.authUser$ = firebaseAuth;
    }

	login(authType: AuthType) {
		if (authType === AuthType.TWITTER) {
			this._login(AuthProviders.Twitter);
		} else if (authType === AuthType.GITHUB) {
			this._login(AuthProviders.Github);
		}
	}

	logout() {
		this.firebaseAuth.logout();
	}

	isLoggedIn() {
		return !!this.firebaseAuth.getAuth();
	}

	private _login(authType: AuthProviders) {
		this.firebaseAuth.login({
			provider: authType
		}).then((authData: any) => {
			authData.auth.token.firebase = null; // remove array
			this.angularFire.object('/users/' + authData.uid + '/authData').set(authData);
		}).catch(err => console.log('Login Failed', err));
	}
}