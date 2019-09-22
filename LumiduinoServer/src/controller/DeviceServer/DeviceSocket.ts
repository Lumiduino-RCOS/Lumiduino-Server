import * as net from "net"

export class DeviceSocket{
    public onDisconnect = () => {};
    
    constructor(socket: net.Socket){

    }
}