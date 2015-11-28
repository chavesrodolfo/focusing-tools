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
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        angular2_1.Component({
            selector: 'focus-home',
            templateUrl: 'build/app/home.html?v=1448668940252?v=1448668908702?v=1448668896929?v=1448668877564?v=1448668868594?v=1448668860981?v=1448668719918?v=1448668709708?v=1448668679722?v=1448668649582?v=1448668620940?v=1448668585543?v=1448668572044?v=1448668561293?v=1448668495567',
            directives: [focus_timer_component_1.FocusTimerCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
})();
exports.Home = Home;
