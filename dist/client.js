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
let myInfo = new type_1.ClientInfo("b213ee6e-e68d-435f-b0b2-fb30a720f05d", config.temperature, config.humidity);
var count = 1;
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
            count++;
            console.log(`\nTX[${count}]\n`);
            console.log(`Name : ${myInfo.name}`);
            console.log(`Temperature : ${myInfo.temperature}`);
            console.log(`humidity : ${myInfo.humidity}`);
            console.log("\n");
            setTimeout(periodicPrint, 10);
        }
        pub_1.default(client, config);
        setTimeout(pub_1.ClientPub, 5000, myInfo);
        setTimeout(periodicPrint, 5000);
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
        case "humidity":
            switch (splitted[1]) {
                case "+":
                    myInfo.humidity++;
                    break;
                case "-":
                    myInfo.humidity--;
                    break;
            }
            break;
    }
    count++;
    var splitted2 = topic.split("/"); //splitted.length
    console.log(`\nRX[${count}]\n`);
    console.log(`${splitted2[0]} sent command to ME`);
    console.log(`Command is :\n${message}`);
});
//# sourceMappingURL=client.js.map