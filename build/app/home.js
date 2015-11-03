System.register(['angular2/angular2', 'app/components/pom-timer'], function(exports_1) {
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
    var angular2_1, pom_timer_1;
    var Home;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (pom_timer_1_1) {
                pom_timer_1 = pom_timer_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home() {
                }
                Home.prototype.eventCompleted = function (pom) {
                    console.log(pom);
                };
                Home = __decorate([
                    angular2_1.Component({
                        selector: 'pom-home',
                        templateUrl: 'build/app/home.html?v=1446526882044',
                        directives: [pom_timer_1.PomTimer]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Home);
                return Home;
            })();
            exports_1("Home", Home);
        }
    }
});
