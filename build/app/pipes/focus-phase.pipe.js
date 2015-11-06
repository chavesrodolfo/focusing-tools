System.register(['angular2/angular2'], function(exports_1) {
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
    var angular2_1;
    var FocusPhasePipe;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            FocusPhasePipe = (function () {
                function FocusPhasePipe() {
                }
                FocusPhasePipe.prototype.transform = function (val, args) {
                    switch (val) {
                        case 0:
                            return 'Pomodoro';
                            break;
                        case 1:
                            return 'Short Break';
                            break;
                        case 2:
                            return 'Long Break';
                            break;
                        default:
                            return 'Error';
                            break;
                    }
                };
                FocusPhasePipe = __decorate([
                    // https://github.com/chjj/marked
                    angular2_1.Pipe({
                        name: 'phasetype'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FocusPhasePipe);
                return FocusPhasePipe;
            })();
            exports_1("FocusPhasePipe", FocusPhasePipe);
        }
    }
});
