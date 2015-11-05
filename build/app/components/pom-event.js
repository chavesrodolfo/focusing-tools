System.register(['angular2/angular2', 'app/pipes/pom-event.pipe'], function(exports_1) {
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
    var angular2_1, pom_event_pipe_1;
    var PomEvent;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (pom_event_pipe_1_1) {
                pom_event_pipe_1 = pom_event_pipe_1_1;
            }],
        execute: function() {
            PomEvent = (function () {
                function PomEvent() {
                }
                PomEvent = __decorate([
                    angular2_1.Component({
                        selector: 'pom-event',
                        templateUrl: 'build/app/components/pom-event.html?v=1446763428580?v=1446763422860?v=1446763415958?v=1446763409590?v=1446763391755',
                        directives: [angular2_1.CORE_DIRECTIVES],
                        pipes: [pom_event_pipe_1.PomEventPipe],
                        inputs: ['pomodoro']
                    }), 
                    __metadata('design:paramtypes', [])
                ], PomEvent);
                return PomEvent;
            })();
            exports_1("PomEvent", PomEvent);
        }
    }
});
