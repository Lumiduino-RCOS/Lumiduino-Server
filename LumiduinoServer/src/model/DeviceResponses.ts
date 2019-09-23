class DeviceMessage{
    private id: string;

    constructor(message: JSON){
        if(message['id'] == null){
            throw(Error("Invalid message, no id received"));
        }
        this.id = message['id'];
    }
}

export declare var informationResponse: {
    name: string;
    id: string;
    deviceType: string;
    functions: Map<string, Map<string, string>>;
}

export class DeviceInformationResponse extends DeviceMessage{
    public device_name: string;
    public device_type: string;
    public methods: JSON;
    public status: JSON;
    private fields = ["device_name", "device_type", "methods", "status"]

    constructor(message: JSON){
        super(message);
        this.fields.forEach(element => {
            if(message[element] == null){
                throw(Error("Invalid Device Information Message"));
            }
            else{
                this[element] = message[element];
            }
        });
    }
}

export class DeviceDataResponse extends DeviceMessage{
    public dataName: string;
    public dataType: string;
    public dataValue: string;
    private fields = ["dataName", "dataType", "dataValue"];

    constructor(message: JSON){
        super(message);
        this.fields.forEach(element => {
            if(message[element] == null){
                throw(Error("Invalid Device Information Message"));
            }
            else{
                this[element] = message[element];
            }
        });
    }
}