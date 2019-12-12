from flask import jsonify
from Server.devicefacade import DeviceFacade
from Server.devicecontroller import DeviceController


class DeviceAPI(object):

    def __init__(self, device_controller: DeviceController):
        self.devices = device_controller

    def get_functions(self, device_id):
        device = self.devices.get_device_by_id(device_id)
        print("Get function_map")
        return jsonify(device.get_function_map()), 200
    
    def get_devices(self):
        return jsonify(self.devices.id_to_addr), 200

    def run_function(self, device_id: str, method: str, args: list):
        device = self.devices.device_by_id.get(device_id)
        try:
            message = device.run_function(method, args)
            return message, 200
        except Exception as err:
            message = str(err)
            return message, 500
    