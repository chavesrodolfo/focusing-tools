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
var FocusUserImageCmp = (function () {
    function FocusUserImageCmp() {
    }
    FocusUserImageCmp = __decorate([
        angular2_1.Component({
            selector: 'focus-user-image',
            templateUrl: 'build/app/components/focus-user-image.component.html?v=1448942474205?v=1448942448506?v=1448939669060?v=1448939666771?v=1448939557469?v=1448939382717',
            inputs: ['authUser']
        }), 
        __metadata('design:paramtypes', [])
    ], FocusUserImageCmp);
    return FocusUserImageCmp;
})();
exports.FocusUserImageCmp = FocusUserImageCmp;
