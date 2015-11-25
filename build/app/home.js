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
var focus_timer_component_1 = require('./components/focus-timer.component');
var data_service_1 = require('./services/data.service');
var auth_service_1 = require('./services/auth.service');
var Home = (function () {
    function Home(_dataService, _authService) {
        this._dataService = _dataService;
        this._authService = _authService;
    }
    Home.prototype.eventCompleted = function (phaseType) {
        this._dataService.addFocusPhase({
            phaseType: phaseType,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    };
    Home = __decorate([
        angular2_1.Component({
            selector: 'focus-home',
            templateUrl: 'build/app/home.html?v=1448421539833?v=1448421491137',
            directives: [focus_timer_component_1.FocusTimerCmp]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, auth_service_1.AuthService])
    ], Home);
    return Home;
})();
exports.Home = Home;
