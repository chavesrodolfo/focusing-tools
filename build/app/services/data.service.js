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
    var DataService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService() {
                    var _this = this;
                    this._firebaseRef = new Firebase('https://agile-pomodoro.firebaseio.com/');
                    this.pomodori$ = Rx.Observable.create(function (observer) { return _this._pomodoriObserver = observer; }).share();
                }
                DataService.prototype.loadPomodori = function () {
                    var _this = this;
                    this._firebaseRef.child('events').on('value', function (snapshot) {
                        _this._pomodoriObserver.onNext(snapshot.val());
                    }, function (errorObject) {
                        console.log('The read failed: ' + errorObject.code);
                    });
                };
                DataService.prototype.addPomodori = function (pomodori) {
                    this._firebaseRef.child('events').push().set(pomodori);
                };
                DataService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DataService);
                return DataService;
            })();
            exports_1("DataService", DataService);
        }
    }
});
