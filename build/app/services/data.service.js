System.register(['angular2/angular2', 'app/services/auth.service'], function(exports_1) {
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
    var angular2_1, auth_service_1;
    var DataService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService(_authService) {
                    var _this = this;
                    this._authService = _authService;
                    this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
                    this.pomodori$ = Rx.Observable.create(function (observer) { return _this._pomodoriObserver = observer; }).share();
                }
                DataService.prototype.loadPomodori = function () {
                    var _this = this;
                    if (this._authService.isLoggedIn()) {
                        this._firebaseRef.child("users/" + this._authService.userSession.uid + "/pomodori").on('value', function (snapshot) {
                            var tempArray = [];
                            for (var property in snapshot.val()) {
                                if (snapshot.val().hasOwnProperty(property)) {
                                    tempArray.push(snapshot.val()[property]);
                                }
                            }
                            _this._pomodoriObserver.onNext(tempArray);
                        }, function (errorObject) {
                            console.log('The read failed: ' + errorObject.code);
                        });
                    }
                };
                DataService.prototype.addPomodori = function (pomodori) {
                    if (this._authService.isLoggedIn()) {
                        this._firebaseRef.child("users/" + this._authService.userSession.uid + "/pomodori").push(pomodori);
                    }
                };
                DataService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], DataService);
                return DataService;
            })();
            exports_1("DataService", DataService);
        }
    }
});
