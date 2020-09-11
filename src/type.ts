type ConfigBroker = {
  ip: string;
  port: number;
};

export type MyConfig = {
  broker: ConfigBroker;
  topics_sub: Array<string>;
  topics_pub: Array<string>;
  command?: Array<string>;
  temperature?: number;
  humidity?: number;
};

interface clientInfo {
  name: string;
  temperature: number;
  humidity: number;
  init?: boolean;
}

interface serverInfo {
  name: string;
  role: string;
  command: string[];
  init?: boolean;
}

export class ClientInfo implements clientInfo {
  constructor(
    public name: string,
    public temperature: number,
    public humidity: number,
    public init?: boolean
  ) {}
}

export class ServerInfo implements serverInfo {
  constructor(
    public name: string,
    public role: string,
    public command: string[],
    public init?: boolean
  ) {}
}
