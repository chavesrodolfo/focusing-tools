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
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/startWith');
var interfaces_1 = require('../interfaces/interfaces');
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        this._firebaseRef = new Firebase('https://focus-app.firebaseio.com/');
        this.authUser$ = new Observable_1.Observable(function (observer) { return _this._authUserObserver = observer; }).share();
        this.authUser$.subscribe();
        this._firebaseRef.onAuth(function (authData) { return _this._authUserObserver.next(authData); });
    }
    Object.defineProperty(AuthService.prototype, "userSession", {
        get: function () {
            return this._firebaseRef.getAuth();
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.loadAuthUser = function () {
        console.log(this._firebaseRef.getAuth());
        this._authUserObserver.next(this._firebaseRef.getAuth());
    };
    AuthService.prototype.login = function (authType) {
        if (authType === interfaces_1.AuthType.TWITTER) {
            this._login('twitter');
        }
        else if (authType === interfaces_1.AuthType.GITHUB) {
            this._login('github');
        }
    };
    AuthService.prototype.logout = function () {
        this._firebaseRef.unauth();
    };
    AuthService.prototype.isLoggedIn = function () {
        return !!this._firebaseRef.getAuth();
    };
    AuthService.prototype._login = function (authTypeVal) {
        var _this = this;
        this._firebaseRef.authWithOAuthPopup(authTypeVal, function (error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            }
            else {
                _this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
            }
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
