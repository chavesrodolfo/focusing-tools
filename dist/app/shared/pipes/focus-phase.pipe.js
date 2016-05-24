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
var interfaces_1 = require('../../interfaces/interfaces');
var FocusPhasePipe = (function () {
    function FocusPhasePipe() {
    }
    FocusPhasePipe.prototype.transform = function (value, args) {
        switch (value) {
            case interfaces_1.PhaseType.FOCUS:
                return 'Focused';
            case interfaces_1.PhaseType.SHORT_BREAK:
                return 'Short Break';
            case interfaces_1.PhaseType.LONG_BREAK:
                return 'Long Break';
            default:
                return 'Custom';
        }
    };
    FocusPhasePipe = __decorate([
        core_1.Pipe({
            name: 'focusPhase'
        }), 
        __metadata('design:paramtypes', [])
    ], FocusPhasePipe);
    return FocusPhasePipe;
}());
exports.FocusPhasePipe = FocusPhasePipe;
//# sourceMappingURL=focus-phase.pipe.js.map