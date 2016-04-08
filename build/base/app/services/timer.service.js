"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var data_service_1 = require('./data.service');
var notification_service_1 = require('./notification.service');
var interfaces_1 = require('../interfaces/interfaces');
var TimerService = (function () {
    function TimerService(_dataService, _notificationService) {
        var _this = this;
        this._dataService = _dataService;
        this._notificationService = _notificationService;
        this.runningTime$ = new Observable_1.Observable(function (observer) { return _this._timerObserver = observer; });
        this.runningTime$.subscribe();
        this.stopTimer();
        this._selectedTime = null;
    }
    Object.defineProperty(TimerService.prototype, "runningPhaseType", {
        get: function () {
            return this._selectedTime;
        },
        enumerable: true,
        configurable: true
    });
    TimerService.prototype.startTimer = function (time) {
        if (this.clockRunning) {
            this.stopTimer();
        }
        else {
            this._startTimer(time);
            // this._startTimer(0);
            this._selectedTime = time;
            this.focusRunning = true;
        }
    };
    TimerService.prototype.stopTimer = function () {
        clearInterval(this._interval);
        this._runningTime = new Date();
        this._runningTime.setMinutes(0);
        this._runningTime.setSeconds(0);
        this._timerObserver.next(this._runningTime);
        this.clockRunning = false;
        this._selectedTime = null;
    };
    TimerService.prototype._startTimer = function (phaseType) {
        var _this = this;
        this._selectedTime = phaseType;
        this.clockRunning = true;
        this._runningTime.setMinutes(phaseType);
        this._runningTime.setSeconds(1); // test until ready for mins
        this._interval = setInterval(function () {
            if (_this._timerFinished()) {
                _this.stopTimer();
                _this._saveTime();
            }
            else {
                _this._runningTime = new Date(_this._runningTime.getTime() - 1000);
            }
            _this._timerObserver.next(_this._runningTime);
        }, 1000);
    };
    TimerService.prototype._timerFinished = function () {
        return (this._runningTime.getSeconds() === 0 && this._runningTime.getMinutes() === 0);
    };
    TimerService.prototype._saveTime = function () {
        var phaseType = null;
        var message = null;
        switch (this._selectedTime) {
            case interfaces_1.PhaseType.FOCUS:
                phaseType = interfaces_1.PhaseType.FOCUS;
                message = 'Focus Phase Complete!';
                break;
            case interfaces_1.PhaseType.SHORT_BREAK:
                phaseType = interfaces_1.PhaseType.SHORT_BREAK;
                message = 'Short Break Complete!';
                break;
            case interfaces_1.PhaseType.LONG_BREAK:
                phaseType = interfaces_1.PhaseType.LONG_BREAK;
                message = 'Long Break Complete!';
                break;
            default:
                phaseType = interfaces_1.PhaseType.FOCUS;
                message = 'Custom Brake Complete!';
                break;
        }
        this._dataService.addFocusPhase({ phaseType: phaseType, dateCreated: Firebase.ServerValue.TIMESTAMP });
        this._notificationService.openNotification(message);
    };
    TimerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [data_service_1.DataService, notification_service_1.NotificationService])
    ], TimerService);
    return TimerService;
}());
exports.TimerService = TimerService;
