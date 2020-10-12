"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPub = exports.ServerPub = exports.ClientPub = void 0;
let initialized = false;
let client = null;
let config = null;
exports.ClientPub = (Info) => {
    if (!initialized) {
        throw Error("pub must be initialized.");
    }
    const recursedMessage = () => {
        for (let i = 0; i < config.topics_pub.length; i++) {
            client.publish(config.topics_pub[i], `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumidity : ${Info.humidity}`);
        }
        setTimeout(recursedMessage, 10);
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
        setTimeout(sendCommand, 10);
    };
    sendCommand();
};
exports.MyPub = (Info) => {
    for (let i = 0; i < 1000; i++) {
        client.publish(config.topics_pub[0], `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumidity : ${Info.humidity}`);
    }
    console.log("Sent 1000 pubs");
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
//# sourceMappingURL=pub.js.map