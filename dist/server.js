"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var pub_1 = __importDefault(require("./pub"));
var config = require("../assets/config.json");
var client = null;
if (config.broker.port !== -1) {
    client = mqtt_1.default.connect("mqtt://" + config.broker.ip + ":" + config.broker.port);
}
else {
    client = mqtt_1.default.connect("mqtt://" + config.broker.ip);
}
if (!client) {
    throw Error("MQTT.connect() error. (ip: " + config.broker.ip + ", port: " + config.broker.port + ")");
}
client.on("connect", function () {
    console.log("connected to MQTT broker [" + config.broker.ip + "]");
    client.subscribe(config.topics_sub, function (err) {
        if (err)
            console.log("cannot subscribe on " + config.topics_sub);
        if (!err)
            console.log("complete subscribe on " + config.topics_sub);
    });
});
client.on("message", function (topic, message) {
    console.log("Message from server(" + topic + ") : " + message);
});
pub_1.default(client, config);
recursedPub();
//# sourceMappingURL=server.js.map