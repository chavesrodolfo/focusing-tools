import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { FirebaseAuth, AuthProviders, AngularFire } from 'angularfire2';

import { AuthUser, AuthType } from '../../interfaces/interfaces';

@Injectable()
export class AuthService {
	authUser: Observable<any>;

	constructor(private firebaseAuth: FirebaseAuth, private angularFire: AngularFire) {
		this.authUser = firebaseAuth;
	}

	login(authType: AuthType) {
		if (authType === AuthType.TWITTER) {
			return this.firebaseLogin(AuthProviders.Twitter);
		} else if (authType === AuthType.GITHUB) {
			return this.firebaseLogin(AuthProviders.Github);
		}
	}

	logout() {
		this.firebaseAuth.logout();
	}

	private firebaseLogin(authType: AuthProviders) {
		return this.firebaseAuth.login({
			provider: authType,
		}).then((authData: any) => {
			authData.auth.token.firebase = null; // remove array
			this.angularFire.database.object('/users/' + authData.uid + '/authData').set(authData);
		}).catch(err => console.log('Login Failed', err));
	}
}