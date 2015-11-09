System.register(['angular2/angular2', 'app/interfaces/interfaces'], function(exports_1) {
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
    var angular2_1, interfaces_1;
    var FocusTimerCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            }],
        execute: function() {
            FocusTimerCmp = (function () {
                function FocusTimerCmp() {
                    this.timeCompleted = new angular2_1.EventEmitter();
                    this.stop();
                }
                FocusTimerCmp.prototype.startPomodoro = function (val) {
                    this.stop();
                    this._startTimer(1);
                };
                FocusTimerCmp.prototype.startShortBreak = function () {
                    this.stop();
                    this._startTimer(5);
                };
                FocusTimerCmp.prototype.startLongBreak = function () {
                    this.stop();
                    this._startTimer(15);
                };
                FocusTimerCmp.prototype.stop = function () {
                    clearInterval(this._interval);
                    // Refactor to use DOM Adapter once ng2 fixed
                    document.title = 'Focus Timer';
                    this.runningTime = new Date();
                    this.runningTime.setMinutes(0);
                    this.runningTime.setSeconds(0);
                };
                FocusTimerCmp.prototype._startTimer = function (mins) {
                    var _this = this;
                    this.runningTime.setMinutes(0);
                    this.runningTime.setSeconds(mins);
                    this._interval = setInterval(function () {
                        if (_this.runningTime.getSeconds() === 0 && _this.runningTime.getMinutes() === 0) {
                            _this.stop();
                            switch (mins) {
                                case 1:
                                    _this.timeCompleted.next(interfaces_1.PhaseType.POMIDORO);
                                    break;
                                case 5:
                                    _this.timeCompleted.next(interfaces_1.PhaseType.SHORT_BREAK);
                                    break;
                                case 15:
                                    _this.timeCompleted.next(interfaces_1.PhaseType.LONG_BREAK);
                                    break;
                                default:
                                    break;
                            }
                        }
                        else {
                            _this.runningTime = new Date(_this.runningTime.getTime() - 1000);
                            // Refactor to use DOM Adapter once ng2 fixed
                            document.title = _this.runningTime.getMinutes() + ":" + _this.runningTime.getSeconds();
                        }
                    }, 1000);
                };
                FocusTimerCmp = __decorate([
                    angular2_1.Component({
                        selector: 'focus-timer',
                        templateUrl: 'build/app/components/focus-timer.component.html?v=1447026981569?v=1447026477888?v=1447026454658?v=1447026389556?v=1447026348834?v=1447026134675?v=1447023781135?v=1447023562848?v=1447023478599?v=1447023434068?v=1447023425838?v=1447022833075?v=1447022821868?v=1447022524835?v=1447022345278?v=1447022320358?v=1447021839434?v=1447021589568?v=1447021401968?v=1447021356701?v=1447021296616?v=1447011007227?v=1447011005340?v=1447007533469?v=1447007455017?v=1447006997307?v=1447004935582?v=1447004848717?v=1447004738408?v=1447004722294?v=1447004700959?v=1447004678336?v=1447004657120?v=1447004554618?v=1447004525118?v=1447004241851?v=1447004117295?v=1447004081220?v=1447003619903',
                        events: ['timeCompleted']
                    }), 
                    __metadata('design:paramtypes', [])
                ], FocusTimerCmp);
                return FocusTimerCmp;
            })();
            exports_1("FocusTimerCmp", FocusTimerCmp);
        }
    }
});
