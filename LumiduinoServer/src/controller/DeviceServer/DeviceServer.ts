import * as net from "net";
import * as dgram from 'dgram';
import {DeviceSocket} from "./DeviceSocket";

export class DeviceServer{
    private server: net.Server;
    private udpSock: dgram.Socket;
    private connectedDevices: Map<string, DeviceSocket>;
    
    constructor(port: Number){
        this.server = net.createServer((socket: net.Socket) => this.onConnection(socket));
        this.udpSock = dgram.createSocket("udp4");
        this.connectedDevices = new Map<string, DeviceSocket>();
        this.server.listen(port, () => {
            console.log("Server is listening");
        });
    }

    public requestDeviceConnection(address: string, port: number){
        const message = JSON.stringify({
            "cmd": "connect",
            "addr": this.udpSock.address()['address'],
            "port": this.server.address()['address']
        });
        this.udpSock.send(message, port, address);
    }

    private onConnection(socket: net.Socket){
        console.log("device connected");
        const address = socket.address()['address'];
        const newSocket = new DeviceSocket(socket);
        this.connectedDevices.set(address, newSocket);
        newSocket.onDisconnect = () => {
            this.connectedDevices.delete(address);
        }
        //
    }
}