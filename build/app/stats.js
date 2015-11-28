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
var focus_phase_component_1 = require('./components/focus-phase.component');
var data_service_1 = require('./services/data.service');
var interfaces_1 = require('./interfaces/interfaces');
var auth_service_1 = require('./services/auth.service');
var Stats = (function () {
    function Stats(_authService, _dataService) {
        var _this = this;
        this._authService = _authService;
        this._dataService = _dataService;
        this._dataService.focusPhases$.subscribe(function (focusPhases) { return _this.focusPhases = focusPhases; });
        this._dataService.loadFocusPhases();
        this._authService.authUser$.subscribe(function (authUser) { return _this.authUser = authUser; });
        this._authService.loadAuthUser();
    }
    Stats.prototype.loginTwitter = function () {
        this._authService.login(interfaces_1.AuthType.TWITTER);
    };
    Stats.prototype.loginGithub = function () {
        this._authService.login(interfaces_1.AuthType.GITHUB);
    };
    Stats = __decorate([
        angular2_1.Component({
            selector: 'focus-stats',
            templateUrl: 'build/app/stats.html?v=1448668940252?v=1448668908702?v=1448668896929?v=1448668877564?v=1448668868594?v=1448668860981?v=1448668719918?v=1448668709708?v=1448668679722?v=1448668649582?v=1448668620940?v=1448668585543?v=1448668572044?v=1448668561293?v=1448668495567',
            directives: [focus_phase_component_1.FocusPhaseCmp]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
    ], Stats);
    return Stats;
})();
exports.Stats = Stats;
