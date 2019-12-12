'''
Listens for network messages signaling the presence of a device
'''
import socket
import threading
import simplejson
from Server.devicecontroller import DeviceController
import sys
import traceback
PORT=2050

class DeviceListener(object):

    def __init__(self, device_controller: DeviceController, logger):
        print("Initializating of device listener")
        self.device_controller = device_controller

        self.client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
        self.client.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        self.client.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self.client.bind(("", PORT))
        self.client.settimeout(1)
        self.running = True

        self.recv_thread = threading.Thread(target=self.listen_thread)
        self.recv_thread.start()

    def listen_thread(self):
        while self.running:
            try:
                data, addr = self.client.recvfrom(15000)
                #print("Got broadcast", data, "from", addr)
                self.on_message(data)
            except socket.timeout:
                continue

    def on_message(self, message):
        try:
            #print(message)
            message_json: dict = simplejson.loads(message)
            if self.verify_device_broadcast(message_json):
                if self.device_controller.register_device(message_json['address'], message_json['port']):
                    print("Device Registered")
        except Exception as err:
            #err.with_traceback()
            exc_type, val, tb = sys.exc_info()
            traceback.print_exception(exc_type, val, tb)
            print("Json could not be decoded")

    def verify_device_broadcast(self, broadcast_dict: dict):
        device_required_fields = [
            "address",
            "port",
            "arduino_lights",
        ]
        for i in device_required_fields:
            try:
                temp = broadcast_dict[i]
            except:
                print("message missing field", i)
                return False
        return True