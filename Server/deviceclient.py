import socket
import time
import queue
import threading

class DeviceClient(object):
    def __init__(self, address, port):
        self.running = True
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.settimeout(1)
        self.socket.bind(('', 0))
        self.socket.connect((address, port))
        self.send_queue = queue.Queue()
        self.recv = threading.Thread(target=self._recv_thread)
        self.send = threading.Thread(target=self._send_thread)
        self.recv.start()
        self.send.start()

    def _recv_thread(self):
        while self.running:
            try:
                data = self.socket.recv(1024)
                print(data)
            except socket.timeout:
                continue


    def _send_thread(self):
        while self.running:
            try:
                to_send = self.send_queue.get(timeout=1)
                self.socket.send(to_send)
                print("Send", to_send)
            except queue.Empty:
                continue
    
    def _add_device_message(self, *args):
        message = ""
        for i in args:
            message += str(i)+","
        message = message.rstrip(",")
        message+=";"
        self.send_queue.put(message.encode('ascii'))

    def send_initialize_light_msg(self, pin: int, length: int):
        self._add_device_message(114, pin, length)

    def send_light_range_msg(self, start: int, end: int, r: int, g: int, b: int):
        self._add_device_message(116, start, end, r, g, b)

    def send_single_light_msg(self, pixel: int, r: int, g: int, b: int):
        self._add_device_message(115, pixel, r, g, b)