"use strict";
var testing_1 = require('@angular/core/testing');
var notification_service_1 = require('./notification.service');
testing_1.describe('Notification Service', function () {
    testing_1.beforeEachProviders(function () { return [notification_service_1.NotificationService]; });
    testing_1.it('should ...', testing_1.inject([notification_service_1.NotificationService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=notification.service.spec.js.map