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
    var TimerService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            TimerService = (function () {
                function TimerService() {
                    var _this = this;
                    this._runningTime = new Date();
                    this._runningTime.setMinutes(0);
                    this._runningTime.setSeconds(0);
                    this.runningTime$ = Rx.Observable.create(function (observer) { return _this._runningTimeObserver = observer; }).share();
                }
                TimerService.prototype.startTime = function (minutes) {
                    this._runningTime.setMinutes(minutes);
                    this._interval = setInterval(this._tick(), 1000);
                };
                TimerService.prototype._tick = function () {
                    this._runningTime.setSeconds(this._runningTime.getSeconds() - 1);
                    this._runningTimeObserver.onNext(this._runningTime);
                };
                TimerService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TimerService);
                return TimerService;
            })();
            exports_1("TimerService", TimerService);
        }
    }
});
