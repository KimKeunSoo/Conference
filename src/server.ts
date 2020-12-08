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
var count: number = 1;
var sequence: number = 1;

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
  count++;
  console.log(`\nRX[${count}]\n`);
  console.log(`${splitted[0]} sent data to ME`);
  console.log(`Data is \n${message}\n`);
  if (count == 10) {
    console.log(`[${sequence++}]  Received 10 packets`);
    count = 0;
  }
});

init(client!, config);
setTimeout(ServerPub, 5000, myInfo);
