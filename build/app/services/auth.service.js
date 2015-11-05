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
                    this.user$ = Rx.Observable.create(function (observer) { return _this._userObserver = observer; }).share();
                    this._firebaseRef.onAuth(function (authData) {
                        if (authData) {
                            console.log("User " + authData.uid + " is logged in with " + authData.provider);
                        }
                        else {
                            console.log("User is logged out");
                        }
                    });
                }
                AuthService.prototype.login = function () {
                    var _this = this;
                    this._firebaseRef.authWithOAuthPopup('twitter', function (error, authData) {
                        if (error) {
                            console.log('Login Failed!', error);
                        }
                        else {
                            _this._firebaseRef.child('/users/' + authData.uid).child('authData').set(authData);
                            _this._userObserver.onNext(_this._firebaseRef.getAuth());
                            console.log('Authenticated successfully with payload:', authData);
                        }
                    });
                };
                AuthService.prototype.logout = function () {
                    console.log('....');
                    this._firebaseRef.unauth();
                    this._userObserver.onNext(this._firebaseRef.getAuth());
                };
                AuthService.prototype.isLoggedIn = function () {
                    return !!this._firebaseRef.getAuth();
                };
                AuthService.prototype.loadUser = function () {
                    this._userObserver.onNext(this._firebaseRef.getAuth());
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
