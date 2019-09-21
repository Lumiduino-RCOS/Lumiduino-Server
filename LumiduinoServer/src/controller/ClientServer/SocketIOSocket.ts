import * as socketio from "socket.io"
import * as ClientCommands from "../../model/ClientCommands"
export class SocketIOSocket{
    public onDisconnect = () => {}; // to be called by socket when it disconnects
    private socket: socketio.Socket;

    constructor(new_socket: socketio.Socket){
        console.log("Client with ID "+new_socket.id+" has connected");
        this.socket = new_socket;
        this.addEventListeners();
    }

    private addEventListeners(){
        this.socket.on("device command", (msg) => {
            const cmd = new ClientCommands.DeviceControlCommand(msg);
            this.onDeviceCommand(cmd);
        });
        this.socket.on("connect device", (msg) => {
            const cmd = new ClientCommands.DeviceConnectCommand(msg);
            this.onDeviceConnect(msg);
        });
        this.socket.on("disconnect device", (msg) => {
            const cmd = new ClientCommands.DeviceDisconnectCommand(msg);
            this.onDeviceDisconnect(msg);
        });
        this.socket.on('disconnect', () => {
            console.log("Client socket "+this.socket.id+" has disconnected");
            this.onDisconnect();
        });
        
    }

    private onDeviceCommand(msg: ClientCommands.DeviceControlCommand){
        // do something
        console.log("Client Device Command");
    }

    private onDeviceConnect(msg: ClientCommands.DeviceConnectCommand){
        //do something
        console.log("Client Device Connect");
    }

    private onDeviceDisconnect(msg: ClientCommands.DeviceDisconnectCommand){
        //do something
        console.log("Client Device disconnect");
    }


}