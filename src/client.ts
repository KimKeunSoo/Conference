import { ClientInfo, MyConfig } from "./type";
import mqtt, { MqttClient } from "mqtt";
import init, { ClientPub } from "./pub";

const config: MyConfig = require("../assets/config_client.json");

let client: MqttClient | null = null;
let myInfo: ClientInfo = new ClientInfo(
  "b213ee6e-e68d-435f-b0b2-fb30a720f05d",
  config.temperature,
  config.humidity
);
var count: number = 1;

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
    // function periodicPrint() {
    //   count++;
    //   console.log(`\nTX[${count}]\n`);
    //   console.log(`Name : ${myInfo.name}`);
    //   console.log(`Temperature : ${myInfo.temperature}`);
    //   console.log(`humidity : ${myInfo.humidity}`);
    //   console.log("\n");
    //   setTimeout(periodicPrint, 1000);
    // }
    init(client!, config);
    setTimeout(ClientPub, 5000, myInfo);
    // setTimeout(periodicPrint, 5000);
  });
});

client.on("message", function (topic, message) {
  var str: string = message.toString();
  var splitted: string[] = str.split("#"); //splitted.length

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
  // var splitted2: string[] = topic.split("/"); //splitted.length
  // console.log(`\nRX[${count}]\n`);
  // console.log(`${splitted2[0]} sent command to ME`);
  // console.log(`Command is :\n${message}`);
});
