"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPub = exports.ClientPub = void 0;
let initialized = false;
let client = null;
let config = null;
exports.ClientPub = (Info) => {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    const recursedMessage = () => {
        for (let i = 0; i < config.topics_pub.length; i++) {
            client.publish(config.topics_pub[i], `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumadity : ${Info.humadity}`, { qos: 2 });
        }
        setTimeout(recursedMessage, 1000);
    };
    recursedMessage();
};
exports.ServerPub = (Info) => {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    const periodicMessage = () => {
        for (let j = 0; j < config.topics_pub.length; j++) {
            client.publish(config.topics_pub[j], Info.command, { qos: 2 });
        }
        setTimeout(periodicMessage, 10000);
    };
    periodicMessage();
};
function init(_client, _config) {
    client = _client;
    config = _config;
    initialized = true;
}
exports.default = init;
//# sourceMappingURL=pub.js.map