"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const mqtt_1 = __importDefault(require("mqtt"));
const pub_1 = __importDefault(require("./pub"));
const config = require("../assets/config_server.json");
let client = null;
let myInfo = new type_1.ServerInfo("ServerID", "ControlTower", config.command);
var count = 1;
var sequence = 1;
if (config.broker.port !== -1) {
    client = mqtt_1.default.connect(`mqtt://${config.broker.ip}:${config.broker.port}`);
}
else {
    client = mqtt_1.default.connect(`mqtt://${config.broker.ip}`);
}
if (!client) {
    throw Error(`MQTT.connect() error. (ip: ${config.broker.ip}, port: ${config.broker.port})`);
}
client.on("connect", () => {
    console.log(`connected to MQTT broker [${config.broker.ip}]`);
    client.subscribe(config.topics_sub, (err) => {
        if (err)
            console.log(`cannot subscribe on ${config.topics_sub}`);
        if (!err)
            console.log(`complete subscribe on ${config.topics_sub}`);
    });
    console.log("---------------------------------");
    console.log(`This ServerID : ${myInfo.name}`);
    console.log(`Role : ${myInfo.role}`);
    console.log("---------------------------------");
});
client.on("message", function (topic, message) {
    var splitted = topic.split("/"); //splitted.length
    count++;
    // console.log(`\nRX[${count}]\n`);
    // console.log(`${splitted[0]} sent data to ME`);
    // console.log(`Data is \n${message}\n`);
    if (count == 10) {
        console.log(`[${sequence++}]  Received 10 packets`);
        count = 0;
    }
});
pub_1.default(client, config);
//setTimeout(ServerPub, 5000, myInfo);
//# sourceMappingURL=server.js.map