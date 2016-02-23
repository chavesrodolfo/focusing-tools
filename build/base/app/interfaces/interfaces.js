"use strict";
(function (PhaseType) {
    PhaseType[PhaseType["FOCUS"] = 0] = "FOCUS";
    PhaseType[PhaseType["SHORT_BREAK"] = 1] = "SHORT_BREAK";
    PhaseType[PhaseType["LONG_BREAK"] = 2] = "LONG_BREAK";
    PhaseType[PhaseType["CUSTOM_BREAK"] = 3] = "CUSTOM_BREAK";
})(exports.PhaseType || (exports.PhaseType = {}));
var PhaseType = exports.PhaseType;
;
(function (AuthType) {
    AuthType[AuthType["TWITTER"] = 0] = "TWITTER";
    AuthType[AuthType["GITHUB"] = 1] = "GITHUB";
})(exports.AuthType || (exports.AuthType = {}));
var AuthType = exports.AuthType;
;
(function (NotificationPermission) {
    NotificationPermission[NotificationPermission["GRANTED"] = 0] = "GRANTED";
    NotificationPermission[NotificationPermission["DENIED"] = 1] = "DENIED";
    NotificationPermission[NotificationPermission["UNSUPPORTED"] = 2] = "UNSUPPORTED";
})(exports.NotificationPermission || (exports.NotificationPermission = {}));
var NotificationPermission = exports.NotificationPermission;
;
;
;
