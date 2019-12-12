from Server.deviceclient import DeviceClient
from Server.devicefacade import DeviceFacade
from uuid import uuid1

class DeviceController(object):

    def __init__(self, logger):
        self.device_map = {}
        self.device_by_id = {}
        self.id_to_addr = {}
        self.logger = logger

    def register_device(self, address, port):
        device_tuple = (address, port)
        #print(self.device_map)
        if self.device_map.get(device_tuple) is not None:
            return False
        new_id = str(uuid1())
        new_device = DeviceClient(address, port)
        new_device_facade = DeviceFacade(new_device)

        self.device_map[(address, port)] = new_device_facade
        self.device_by_id[new_id] = new_device_facade
        self.id_to_addr[new_id] = (address, port)
        return True

    def get_device(self, address, port) -> DeviceFacade:
        return self.device_map.get((address, port))

    def get_device_by_id(self, id_) -> DeviceFacade:
        return self.device_by_id.get(id_)
