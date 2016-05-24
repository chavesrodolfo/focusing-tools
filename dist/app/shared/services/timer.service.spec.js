"use strict";
var testing_1 = require('@angular/core/testing');
var timer_service_1 = require('./timer.service');
testing_1.describe('Timer Service', function () {
    testing_1.beforeEachProviders(function () { return [timer_service_1.TimerService]; });
    testing_1.it('should ...', testing_1.inject([timer_service_1.TimerService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=timer.service.spec.js.map