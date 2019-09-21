class ClientMessage{
    public messageID: string;

    constructor(message: JSON){
        if(message['id'] == null){
            throw Error("Message has no associated ID");
        }
        this.messageID = message['id']
    }
}

export class DeviceControlCommand extends ClientMessage{
    public command: string;
    public arguments: [string];

    constructor(message: JSON){
        super(message);
        if(message['command'] == null || message['args'] == null){
            throw Error("DeviceControlCommand is not properly formatted");
        }
        this.command = message['command'];
        this.arguments = message['arguments'];
    }
}

export class DeviceConnectCommand extends ClientMessage{
    public deviceID: string;
    public user: string;

    constructor(message: JSON){
        super(message);
        if(message['deviceID'] == null || message['user'] == null ){
            throw Error("DeviceConnectCommand is not properly formatted");
        }
        this.deviceID = message['deviceID'];
        this.user = message['user'];
    }
}

export class DeviceDisconnectCommand extends ClientMessage{
    public deviceID: string;
    public user: string;

    constructor(message: JSON){
        super(message);
        if(message['deviceID'] == null || message['user'] == null){
            throw Error("DeviceDisconnectCommand is not properly formatted");
        }
        this.deviceID = message['deviceID'];
        this.user = message['user'];
    }
}