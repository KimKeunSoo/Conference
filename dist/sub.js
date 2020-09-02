"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
var sub_001 = function (message) {
    console.log("sub_001(message: " + message + ")");
};
exports.onMessage = function (topic, message) {
    switch (topic) {
        case "service/client001":
            sub_001(message);
            break;
        case "service/server001":
            console.log("message received from topic (" + topic + ") message(" + message + ")");
            break;
        default:
            console.log("unknown topic " + topic);
    }
};
//# sourceMappingURL=sub.js.map