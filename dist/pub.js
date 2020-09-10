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
            client.publish(config.topics_pub[i], `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumadity : ${Info.humadity}`);
        }
        setTimeout(recursedMessage, 1000);
    };
    recursedMessage();
};
exports.ServerPub = (Info) => {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    const sendCommand = () => {
        var commandNumber = getRandomCommand(0, config.topics_pub.length - 1);
        client.publish(config.topics_pub[commandNumber], Info.command[commandNumber]);
        setTimeout(sendCommand, 1000);
    };
    sendCommand();
};
function init(_client, _config) {
    client = _client;
    config = _config;
    initialized = true;
}
exports.default = init;
function getRandomCommand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=pub.js.map