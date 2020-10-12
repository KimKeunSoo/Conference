//Type Definition

//Broker's IP and Port type definition
type ConfigBroker = {
  ip: string;
  port: number;
};

export type MyConfig = {
  broker: ConfigBroker; //Broker configuration that Client or Server want to connect
  topics_sub: Array<string>; //Topics that Client or Server want to subscribe
  topics_pub: Array<string>; //Topics that Client or Server want to publish
  command?: Array<string>; //Command message that Server want to control Client
  temperature?: number; //Client's temperature information
  humidity?: number; //Client's humidity information
};

interface clientInfo {
  //Properties of Client which are shown at Client's console window
  name: string; //Client's ID(name)
  temperature: number; //Client's temperature information
  humidity: number; //Client's humidity information
  init?: boolean; //Indicate that Client information is initialized or not
}

interface serverInfo {
  //Properties of Server which are shown at Server's console window
  name: string; //Server's ID(name)
  role: string; //Server's role
  command: string[]; //Command message that Server want to control Client
  init?: boolean; //Indicate that Server information is initialized or not
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
