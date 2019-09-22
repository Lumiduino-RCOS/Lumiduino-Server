import * as net from "net";
import * as DeviceResponses from "../../model/DeviceResponses"
const DELIM = ";";

export class DeviceSocket{
    public onDisconnect = () => {};
    private socket: net.Socket;
    private messageFragment: string;
    private delimeter = ";";

    constructor(socket: net.Socket){
        this.socket = socket;
        this.messageFragment = "";
        this.addEventListeners();
    }

    private addEventListeners(){
        this.socket.on("close", () => this.onClose());
        this.socket.on("data", (message) => this.onData(message));
        this.socket.on("error", (err: Error) => console.log(err));
    }

    private onClose(){
        console.log("device disconnected");
        this.onDisconnect();
    }

    private onData(message){
        message = message.toString()
        for(let i=0; i<message.length; i++){
            console.log(message[i].toString());
            if(message[i] == DELIM){
                try{
                    const message = JSON.parse(this.messageFragment);
                    this.messageFragment = "";
                    this.onMessage(message); 
                }      
                catch(err){
                    console.log("ERROR "+err);
                    this.messageFragment = "";
                    continue;
                }
            }
            else{
                this.messageFragment+=message[i];
            }
        }
    }

    private onMessage(message: JSON){
        if(message['header'] == null ||
           message['header']['type'] == null ||
           message['body'] == null) {
            throw(Error("Missing Header"));
        }
        const type = message['header']['type'];
        const body = message
        //parse message;
        if(type == "information"){
            const msg = new DeviceResponses.DeviceInformationResponse(body);
            //device.onInformation
        }
        else if(type == "data"){
            const msg = new DeviceResponses.DeviceDataResponse(body);
            //device.onData
        }
        else{
            console.log("Unknown Response from device");
        }

    }
}