import { MyConfig, ClientInfo, ServerInfo } from "./type";
import { MqttClient } from "mqtt";

let initialized: boolean = false;
let client: MqttClient | null = null;
let config: MyConfig | null = null;

export const ClientPub = (Info: ClientInfo) => {
  if (!initialized) {
    throw Error("pub must be initialized.");
  }

  const recursedMessage = () => {
    for (let i = 0; i < config.topics_pub.length; i++) {
      client.publish(
        config.topics_pub[i],
        `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumidity : ${Info.humidity}`
      );
    }
    setTimeout(recursedMessage, 10);
  };
  recursedMessage();
};

export const ServerPub = (Info: ServerInfo) => {
  if (!initialized) {
    throw Error("pub must be initialized.");
  }

  const sendCommand = () => {
    var commandNumber: number = getRandomCommand(
      0,
      config.topics_pub.length - 1
    );
    client.publish(
      config.topics_pub[commandNumber],
      Info.command[commandNumber]
    );
    setTimeout(sendCommand, 10);
  };
  sendCommand();
};

export const MyPub = (Info: ClientInfo) => {
  for (let i = 0; i < 1000; i++) {
    client.publish(
      config.topics_pub[0],
      `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumidity : ${Info.humidity}`
    );
  }

  console.log("Sent 1000 pubs");
};

export default function init(_client: MqttClient, _config: MyConfig) {
  client = _client;
  config = _config;

  initialized = true;
}

function getRandomCommand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
