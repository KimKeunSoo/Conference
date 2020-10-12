"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerInfo = exports.ClientInfo = void 0;
class ClientInfo {
    constructor(name, temperature, humidity, init) {
        this.name = name;
        this.temperature = temperature;
        this.humidity = humidity;
        this.init = init;
    }
}
exports.ClientInfo = ClientInfo;
class ServerInfo {
    constructor(name, role, command, init) {
        this.name = name;
        this.role = role;
        this.command = command;
        this.init = init;
    }
}
exports.ServerInfo = ServerInfo;
//# sourceMappingURL=type.js.map