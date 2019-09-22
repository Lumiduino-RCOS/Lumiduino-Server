import * as uuidv1 from "uuid/v1";

class DeviceCommand{
    public id: string;

    constructor(){
        this.id = uuidv1();
    }
}

export class RequestInformation extends DeviceCommand{
    
    constructor(){
        super();
    }

    public Serialize(): string{
        return JSON.stringify({
            "id": this.id,
            "command": "request_information"
        });
    }
}

export class RequestData extends DeviceCommand{
    public sensorId: string;

    constructor(sensor_id: string){
        super();
        this.sensorId = sensor_id;
    }

    public Serialize(): string{
        return JSON.stringify({
            "id": this.id,
            "command": "request_data",
            "sensor_id": this.sensorId,
        });
    }
}

export class ExecuteCommand extends DeviceCommand{
    public commandID: string;
    public arguments: [string];

    constructor(commandID: string, args: [string]){
        super();
        this.commandID = commandID;
        this.arguments = args;
    }

    public Serialize(): string{
        return JSON.stringify({
            "id": this.id,
            "command": "execute_command",
            "executable": this.commandID,
            "args": this.arguments
        });
    }
}