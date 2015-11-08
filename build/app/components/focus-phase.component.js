System.register(['angular2/angular2', 'app/pipes/focus-phase.pipe'], function(exports_1) {
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
    var angular2_1, focus_phase_pipe_1;
    var FocusPhaseCmp;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (focus_phase_pipe_1_1) {
                focus_phase_pipe_1 = focus_phase_pipe_1_1;
            }],
        execute: function() {
            FocusPhaseCmp = (function () {
                function FocusPhaseCmp() {
                }
                FocusPhaseCmp = __decorate([
                    angular2_1.Component({
                        selector: 'focus-phase',
                        templateUrl: 'build/app/components/focus-phase.component.html?v=1447011007227?v=1447011005340?v=1447007533469?v=1447007455017?v=1447006997307?v=1447004935582?v=1447004848717?v=1447004738408?v=1447004722294?v=1447004700959?v=1447004678336?v=1447004657120?v=1447004554618?v=1447004525118?v=1447004241851?v=1447004117295?v=1447004081220?v=1447003619903',
                        directives: [angular2_1.CORE_DIRECTIVES],
                        pipes: [focus_phase_pipe_1.FocusPhasePipe],
                        inputs: ['focusPhase']
                    }), 
                    __metadata('design:paramtypes', [])
                ], FocusPhaseCmp);
                return FocusPhaseCmp;
            })();
            exports_1("FocusPhaseCmp", FocusPhaseCmp);
        }
    }
});
