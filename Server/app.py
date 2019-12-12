from flask import Flask, request
from Server.containers import ServerContainer
from Server.deviceclient import DeviceClient
import simplejson

app = Flask(__name__)
#device_controller = ServerContainer.device_controller()
device_api = ServerContainer.device_api()

@app.route('/api/devices', methods=['GET'])
def list_devices():
    return device_api.get_devices()

@app.route('/api/devices/<deviceid>', methods=['GET'])
def list_device_functions(deviceid: str):
    return device_api.get_functions(deviceid)

@app.route('/api/devices/<deviceid>', methods=['POST'])
def run_function(deviceid: str):
    method = request.json['method']
    args = request.json['args']
    return device_api.run_function(deviceid, method, args)

if __name__=="__main__":
    device_listener = ServerContainer.device_listener()
    app.run()