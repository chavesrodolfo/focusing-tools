var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var timer_service_1 = require('../services/timer.service');
var FocusTimerCmp = (function () {
    function FocusTimerCmp(_timerService) {
        var _this = this;
        this._timerService = _timerService;
        this.timeCompleted = new angular2_1.EventEmitter();
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this.clockRunning = false;
        this._timerService.runningTime$.subscribe(function (time) { return _this._calcTime(time); });
        this._enableButtons();
    }
    FocusTimerCmp.prototype.startFocus = function () {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        }
        else {
            this._timerService.startTimer(25);
            this._disableButtons();
            this.focusRunning = true;
        }
    };
    FocusTimerCmp.prototype.startShortBreak = function () {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        }
        else {
            this._timerService.startTimer(5);
            this._disableButtons();
            this.shortRunning = true;
        }
    };
    FocusTimerCmp.prototype.startLongBreak = function () {
        if (this.clockRunning) {
            this._timerService.stopTimer();
            this._enableButtons();
        }
        else {
            this._timerService.startTimer(15);
            this._disableButtons();
            this.longRunning = true;
        }
    };
    FocusTimerCmp.prototype._disableButtons = function () {
        this.focusRunning = false;
        this.shortRunning = false;
        this.longRunning = false;
    };
    FocusTimerCmp.prototype._enableButtons = function () {
        this.focusRunning = true;
        this.shortRunning = true;
        this.longRunning = true;
    };
    FocusTimerCmp.prototype._calcTime = function (time) {
        this.runningTime = time;
        this.clockRunning = true;
        document.title = this.runningTime.getMinutes() + ":" + this.runningTime.getSeconds();
        if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
            this.timeCompleted.next(true);
            this._enableButtons();
            this.clockRunning = false;
            document.title = 'Focus Time Management';
        }
    };
    FocusTimerCmp = __decorate([
        angular2_1.Component({
            selector: 'focus-timer',
            templateUrl: 'app/components/focus-timer.component.html',
            events: ['timeCompleted']
        }), 
        __metadata('design:paramtypes', [timer_service_1.TimerService])
    ], FocusTimerCmp);
    return FocusTimerCmp;
})();
exports.FocusTimerCmp = FocusTimerCmp;
