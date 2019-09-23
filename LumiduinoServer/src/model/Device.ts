import * as net from "net";
import {DeviceSocket} from "../controller/DeviceServer/DeviceSocket"

export class Device{
    private name: string;
    private id: string;
    private deviceType: string;
    private connected: boolean;
    private associatedSocket: DeviceSocket;
    private state: JSON;
    private errors: [string];
    private messageLog: [string];
    private functions: Map<string, Map<string, string>>;

    constructor(associated_socket: net.Socket){
        this.associatedSocket = new DeviceSocket(associated_socket);
        this.functions = new Map<string, Map<string,string>>();
    }

    private get_info(){
        
    }


}