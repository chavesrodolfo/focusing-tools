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
    var PomTimer;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            PomTimer = (function () {
                function PomTimer() {
                    this.timeCompleted = new angular2_1.EventEmitter();
                    this.stop();
                }
                PomTimer.prototype.startPomodoro = function (val) {
                    this.stop();
                    this._startTimer(1);
                };
                PomTimer.prototype.startShortBreak = function () {
                    this.stop();
                    this._startTimer(5);
                };
                PomTimer.prototype.startLongBreak = function () {
                    this.stop();
                    this._startTimer(15);
                };
                PomTimer.prototype.stop = function () {
                    clearInterval(this._interval);
                    // Refactor to use DOM Adapter once ng2 fixed
                    document.title = 'Agile Pomodoro';
                    this.runningTime = new Date();
                    this.runningTime.setMinutes(0);
                    this.runningTime.setSeconds(0);
                };
                PomTimer.prototype._startTimer = function (mins) {
                    var _this = this;
                    this.runningTime.setMinutes(0);
                    this.runningTime.setSeconds(mins);
                    this._interval = setInterval(function () {
                        if (_this.runningTime.getSeconds() === 0 && _this.runningTime.getMinutes() === 0) {
                            _this.stop();
                            _this.timeCompleted.next(mins);
                        }
                        else {
                            _this.runningTime = new Date(_this.runningTime.getTime() - 1000);
                            // Refactor to use DOM Adapter once ng2 fixed
                            document.title = _this.runningTime.getMinutes() + ":" + _this.runningTime.getSeconds();
                        }
                    }, 1000);
                };
                PomTimer = __decorate([
                    angular2_1.Component({
                        selector: 'pom-timer',
                        templateUrl: 'app/components/pom-timer.html',
                        events: ['timeCompleted']
                    }), 
                    __metadata('design:paramtypes', [])
                ], PomTimer);
                return PomTimer;
            })();
            exports_1("PomTimer", PomTimer);
        }
    }
});
