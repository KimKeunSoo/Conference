"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodicPub = exports.recursedPub = exports.command = exports.temparature = void 0;
var initialized = false;
var _client = null;
var _config = null;
exports.temparature = "36";
exports.command = "DoIt";
exports.recursedPub = function () {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    var recursedMessage = function () {
        _client.publish(_config.topic_pub, exports.temparature);
        setTimeout(recursedMessage, 1000);
    };
    recursedMessage();
};
exports.periodicPub = function () {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    var periodicMessage = function () {
        _client.publish(_config.topic_pub, exports.command);
        setTimeout(periodicMessage, 10000);
    };
    periodicMessage();
};
function init(client, config) {
    _client = client;
    _config = config;
    initialized = true;
}
exports.default = init;
//# sourceMappingURL=pub.js.map