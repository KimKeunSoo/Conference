"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var pub_1 = __importStar(require("./pub"));
var config = require("../assets/config.json");
var client = null;
var temparature = 26;
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
pub_1.recursedPub();
//# sourceMappingURL=client.js.map