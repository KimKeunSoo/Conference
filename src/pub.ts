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
        `Name : ${Info.name}\nTemperature : ${Info.temperature}\nHumadity : ${Info.humadity}`
      );
    }
    setTimeout(recursedMessage, 1000);
  };
  recursedMessage();
};

export const ServerPub = (Info: ServerInfo) => {
  if (!initialized) {
    throw Error("pub must be initialized.");
  }
  const periodicMessage = () => {
    for (let j = 0; j < config.topics_pub.length; j++) {
      client.publish(config.topics_pub[j], Info.command);
    }
    setTimeout(periodicMessage, 10000);
  };
  periodicMessage();
};

export default function init(_client: MqttClient, _config: MyConfig) {
  client = _client;
  config = _config;

  initialized = true;
}
