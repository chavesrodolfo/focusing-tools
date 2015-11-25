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
var interfaces_1 = require('../interfaces/interfaces');
var FocusTimerCmp = (function () {
    function FocusTimerCmp() {
        this.timeCompleted = new angular2_1.EventEmitter();
        this._stopTimer();
        this._enableButtons();
    }
    FocusTimerCmp.prototype.startFocus = function () {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        }
        else {
            this._startTimer(1);
            this._disableButtons();
            this.focusRunning = true;
        }
    };
    FocusTimerCmp.prototype.startShortBreak = function () {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        }
        else {
            this._startTimer(5);
            this._disableButtons();
            this.shortRunning = true;
        }
    };
    FocusTimerCmp.prototype.startLongBreak = function () {
        if (this.clockRunning) {
            this._stopTimer();
            this._enableButtons();
        }
        else {
            this._startTimer(15);
            this._disableButtons();
            this.longRunning = true;
        }
    };
    FocusTimerCmp.prototype._stopTimer = function () {
        clearInterval(this._interval);
        // Refactor to use DOM Adapter once ng2 fixed
        document.title = 'Focus Timer';
        this.runningTime = new Date();
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(0);
        this.clockRunning = false;
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
    FocusTimerCmp.prototype._startTimer = function (mins) {
        var _this = this;
        this.clockRunning = true;
        this.runningTime.setMinutes(0);
        this.runningTime.setSeconds(mins + 1);
        this._interval = setInterval(function () {
            if (_this.runningTime.getSeconds() === 0 && _this.runningTime.getMinutes() === 0) {
                _this._stopTimer();
                _this._enableButtons();
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
            templateUrl: 'build/app/components/focus-timer.component.html?v=1448421539833?v=1448421491137',
            events: ['timeCompleted']
        }), 
        __metadata('design:paramtypes', [])
    ], FocusTimerCmp);
    return FocusTimerCmp;
})();
exports.FocusTimerCmp = FocusTimerCmp;
