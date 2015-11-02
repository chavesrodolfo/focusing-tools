System.register(['angular2/angular2', 'app/services/timer.service'], function(exports_1) {
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
    var angular2_1, timer_service_1;
    var Home;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (timer_service_1_1) {
                timer_service_1 = timer_service_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(_timerService) {
                    var _this = this;
                    this._timerService = _timerService;
                    this.runningTime = new Date();
                    this.runningTime.setMinutes(0);
                    this.runningTime.setSeconds(0);
                    this._timerService.runningTime$.subscribe(function (time) { return _this.runningTime = time.getTime(); });
                }
                Home.prototype.start = function () {
                    this._timerService.startTime(25);
                };
                Home.prototype.stop = function () {
                    this._timerService.stopTime();
                };
                Home = __decorate([
                    angular2_1.Component({
                        selector: 'pom-home',
                        templateUrl: 'app/home.html'
                    }), 
                    __metadata('design:paramtypes', [timer_service_1.TimerService])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
