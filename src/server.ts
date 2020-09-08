import { ServerInfo, MyConfig } from "./type";
import mqtt, { MqttClient } from "mqtt";
import init, { ServerPub } from "./pub";
const config: MyConfig = require("../assets/config_server.json");

let client: MqttClient | null = null;
let myInfo: ServerInfo = new ServerInfo(
  "ServerID",
  "ControlTower",
  config.command
);

if (config.broker.port !== -1) {
  client = mqtt.connect(`mqtt://${config.broker.ip}:${config.broker.port}`);
} else {
  client = mqtt.connect(`mqtt://${config.broker.ip}`);
}

if (!client) {
  throw Error(
    `MQTT.connect() error. (ip: ${config.broker.ip}, port: ${config.broker.port})`
  );
}
client.on("connect", () => {
  console.log(`connected to MQTT broker [${config.broker.ip}]`);
  client.subscribe(config.topics_sub, (err) => {
    if (err) console.log(`cannot subscribe on ${config.topics_sub}`);
    if (!err) console.log(`complete subscribe on ${config.topics_sub}`);
  });
  console.log("---------------------------------");
  console.log(`This ServerID : ${myInfo.name}`);
  console.log(`Role : ${myInfo.role}`);
  console.log("---------------------------------");
});

client.on("message", function (topic, message) {
  var splitted: string[] = topic.split("/"); //splitted.length
  console.log(`${splitted[0]} sent ${splitted[1]} to ME`);
  console.log(`(${splitted[1]} is \n${message}\n`);
});

init(client!, config);
ServerPub(myInfo);
