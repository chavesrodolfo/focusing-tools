"use strict";
var testing_1 = require('@angular/core/testing');
var data_service_1 = require('./data.service');
testing_1.describe('Data Service', function () {
    testing_1.beforeEachProviders(function () { return [data_service_1.DataService]; });
    testing_1.it('should ...', testing_1.inject([data_service_1.DataService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=data.service.spec.js.map