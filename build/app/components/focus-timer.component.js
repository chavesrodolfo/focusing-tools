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
            this._timerService.startTimer(1);
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
            templateUrl: 'build/app/components/focus-timer.component.html?v=1448942474205?v=1448942448506?v=1448939669060?v=1448939666771?v=1448939557469?v=1448939382717',
            events: ['timeCompleted']
        }), 
        __metadata('design:paramtypes', [timer_service_1.TimerService])
    ], FocusTimerCmp);
    return FocusTimerCmp;
})();
exports.FocusTimerCmp = FocusTimerCmp;
