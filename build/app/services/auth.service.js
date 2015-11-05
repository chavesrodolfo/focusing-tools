System.register(['angular2/angular2'], function(exports_1) {
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
    var angular2_1;
    var AuthService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService() {
                    var _this = this;
                    this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
                    this.authUser$ = Rx.Observable.create(function (observer) { return _this._authUserObserver = observer; }).share();
                    this.authUser$.subscribe();
                    this._firebaseRef.onAuth(function (authData) {
                        if (authData) {
                            _this._authUserObserver.onNext(authData);
                        }
                        else {
                            _this._authUserObserver.onNext(null);
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
                    this._authUserObserver.onNext(this._firebaseRef.getAuth());
                };
                AuthService.prototype.login = function () {
                    var _this = this;
                    this._firebaseRef.authWithOAuthPopup('twitter', function (error, authData) {
                        if (error) {
                            console.log('Login Failed!', error);
                        }
                        else {
                            _this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
                        }
                    });
                };
                AuthService.prototype.logout = function () {
                    this._firebaseRef.unauth();
                };
                AuthService.prototype.isLoggedIn = function () {
                    return !!this._firebaseRef.getAuth();
                };
                AuthService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AuthService);
                return AuthService;
            })();
            exports_1("AuthService", AuthService);
        }
    }
});
