var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var interfaces_1 = require('../interfaces/interfaces');
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        this._firebaseRef = new Firebase('https://focus-app.firebaseio.com/');
        this.authUser$ = new angular2_1.Observable(function (observer) { return _this._authUserObserver = observer; }).share();
        this.authUser$.subscribe();
        this._firebaseRef.onAuth(function (authData) {
            if (authData) {
                _this._authUserObserver.next(authData);
            }
            else {
                _this._authUserObserver.next(null);
            }
        });
    }
    ;
    Object.defineProperty(AuthService.prototype, "userSession", {
        get: function () {
            return this._firebaseRef.getAuth();
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.loadAuthUser = function () {
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
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
