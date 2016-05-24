"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/startWith');
var angularfire2_1 = require('angularfire2');
var interfaces_1 = require('../../interfaces/interfaces');
var AuthService = (function () {
    function AuthService(firebaseAuth, angularFire) {
        this.firebaseAuth = firebaseAuth;
        this.angularFire = angularFire;
        this.authUser$ = firebaseAuth;
    }
    AuthService.prototype.login = function (authType) {
        if (authType === interfaces_1.AuthType.TWITTER) {
            this._login(angularfire2_1.AuthProviders.Twitter);
        }
        else if (authType === interfaces_1.AuthType.GITHUB) {
            this._login(angularfire2_1.AuthProviders.Github);
        }
    };
    AuthService.prototype.logout = function () {
        this.firebaseAuth.logout();
    };
    AuthService.prototype.isLoggedIn = function () {
        return !!this.firebaseAuth.getAuth();
    };
    AuthService.prototype._login = function (authType) {
        var _this = this;
        this.firebaseAuth.login({
            provider: authType
        }).then(function (authData) {
            authData.auth.token.firebase = null; // remove array
            _this.angularFire.object('/users/' + authData.uid + '/authData').set(authData);
        }).catch(function (err) { return console.log('Login Failed', err); });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth, angularfire2_1.AngularFire])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map