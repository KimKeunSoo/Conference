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
const type_1 = require("./type");
const mqtt_1 = __importDefault(require("mqtt"));
const pub_1 = __importStar(require("./pub"));
const config = require("../assets/config_client.json");
let client = null;
let myInfo = new type_1.ClientInfo("ClientID", config.temperature, config.humadity);
var count = 0;
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
        function periodicPrint() {
            console.log("---------------------------------");
            console.log(`Name : ${myInfo.name}`);
            console.log(`Temperature : ${myInfo.temperature}`);
            console.log(`Humadity : ${myInfo.humadity}`);
            console.log("---------------------------------");
            setTimeout(periodicPrint, 1000);
        }
        pub_1.default(client, config);
        pub_1.ClientPub(myInfo);
        periodicPrint();
    });
});
client.on("message", function (topic, message) {
    var str = message.toString();
    var splitted = str.split("#"); //splitted.length
    switch (splitted[0]) {
        case "temperature":
            switch (splitted[1]) {
                case "+":
                    myInfo.temperature++;
                    break;
                case "-":
                    myInfo.temperature--;
                    break;
            }
            break;
        case "humadity":
            switch (splitted[1]) {
                case "+":
                    myInfo.humadity++;
                    break;
                case "-":
                    myInfo.humadity--;
                    break;
            }
            break;
    }
    var splitted2 = topic.split("/"); //splitted.length
    console.log(`${splitted2[0]} sent ${splitted2[1]} to ME`);
    console.log(`${splitted[1]}[${count++}] is :\n${message}`);
});
//# sourceMappingURL=client.js.map