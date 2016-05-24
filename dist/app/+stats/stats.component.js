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
var core_1 = require('@angular/core');
var focus_phase_1 = require('../shared/components/focus-phase');
var data_service_1 = require('../shared/services/data.service');
var auth_service_1 = require('../shared/services/auth.service');
var interfaces_1 = require('../interfaces/interfaces');
require('chartjs');
var StatsComponent = (function () {
    function StatsComponent(authService, dataService) {
        this.authService = authService;
        this.dataService = dataService;
        this.graphCreated = false;
        this.totalFocusedTime = 0;
    }
    StatsComponent.prototype.ngOnInit = function () {
        this.user$ = this.authService.authUser$;
    };
    StatsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.userSubscription = this.authService.authUser$.subscribe(function () {
            _this.focusSubscription = _this.dataService.focusPhases$.subscribe(function (phases) {
                _this._setUpHistory(phases);
            });
        });
    };
    StatsComponent.prototype.ngOnDestroy = function () {
        this.focusSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    };
    StatsComponent.prototype.loginTwitter = function () {
        this.authService.login(interfaces_1.AuthType.TWITTER);
    };
    StatsComponent.prototype.loginGithub = function () {
        this.authService.login(interfaces_1.AuthType.GITHUB);
    };
    // Yeah, I know working on cleaning this up to a service...
    StatsComponent.prototype._setUpHistory = function (phases) {
        if (phases && this.canvas) {
            var data = this._createGraphData(phases);
            var ctx = this.canvas.nativeElement.getContext('2d');
            var options = { responsive: true };
            this.chart = new Chart(ctx).Line(data, options);
        }
    };
    StatsComponent.prototype._createGraphData = function (phases) {
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
    StatsComponent.prototype._isSameDay = function (d1, d2) {
        if ((d1.getDay() === d2.getDay()) && (d1.getMonth() === d2.getMonth()) && (d1.getYear() === d2.getYear())) {
            return true;
        }
        return false;
    };
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', Object)
    ], StatsComponent.prototype, "canvas", void 0);
    StatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-stats',
            templateUrl: 'stats.component.html',
            styleUrls: ['stats.component.css'],
            directives: [focus_phase_1.FocusPhaseComponent]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map