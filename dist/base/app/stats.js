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
var focus_phase_component_1 = require('./components/focus-phase.component');
var data_service_1 = require('./services/data.service');
var interfaces_1 = require('./interfaces/interfaces');
var auth_service_1 = require('./services/auth.service');
var Stats = (function () {
    function Stats(_authService, _dataService) {
        var _this = this;
        this._authService = _authService;
        this._dataService = _dataService;
        this.graphCreated = false;
        this.totalFocusedTime = 0;
        this.focusSubscription = this._authService.authUser$.subscribe(function (user) { return _this.user = user; });
        this.userSubscription = this._dataService.focusPhases$.subscribe(function (phases) {
            _this.phases = phases;
            _this._setUpHistory();
            // this.totalFocusedTime = data.reduce((a, b) => a + b) * PhaseType.FOCUS;
        });
    }
    Stats.prototype.ngOnInit = function () {
        this._authService.loadAuthUser();
        this._dataService.loadFocusPhases();
    };
    Stats.prototype.ngOnDestroy = function () {
        this.focusSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    };
    Stats.prototype.ngAfterViewInit = function () {
        this._setUpHistory();
    };
    Stats.prototype.loginTwitter = function () {
        this._authService.login(interfaces_1.AuthType.TWITTER);
    };
    Stats.prototype.loginGithub = function () {
        this._authService.login(interfaces_1.AuthType.GITHUB);
    };
    // Yeah, I know working on cleaning this up to a service...
    Stats.prototype._createGraphData = function (phases) {
        var _this = this;
        var labels = [];
        var data = [];
        var dates = [];
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();
        for (var i = 0; i < 14; i++) {
            var day = new Date(year, month, date - i);
            labels.push(day.getUTCDate() + "-" + (day.getUTCMonth() + 1) + "-" + day.getUTCFullYear());
            dates.push(day);
            data.push(0);
        }
        dates.forEach(function (day, i) {
            phases.forEach(function (phase, j) {
                if (_this._isSameDay(day, new Date(phase.dateCreated))) {
                    data[i] = data[i] + 1;
                }
            });
        });
        labels.reverse();
        data.reverse();
        return {
            labels: labels,
            datasets: [
                {
                    label: "Focus",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "#d76450",
                    pointColor: "#d76450",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#d76450",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data
                }
            ]
        };
    };
    Stats.prototype._isSameDay = function (d1, d2) {
        if ((d1.getDay() === d2.getDay()) && (d1.getMonth() === d2.getMonth()) && (d1.getYear() === d2.getYear())) {
            return true;
        }
        return false;
    };
    Stats.prototype._setUpHistory = function () {
        if (this.phases && this.canvas && this.graphCreated === false) {
            var data = this._createGraphData(this.phases);
            var ctx = this.canvas.nativeElement.getContext('2d');
            var options = {
                responsive: true
            };
            this.chart = new Chart(ctx).Line(data, options);
            this.graphCreated = true;
        }
    };
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', Object)
    ], Stats.prototype, "canvas", void 0);
    Stats = __decorate([
        core_1.Component({
            selector: 'focus-stats',
            templateUrl: 'app/stats.html',
            directives: [focus_phase_component_1.FocusPhaseCmp]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
    ], Stats);
    return Stats;
}());
exports.Stats = Stats;
