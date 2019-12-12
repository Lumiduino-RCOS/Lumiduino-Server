from typing import Dict
from abc import ABC, abstractmethod
import inspect
from Server.deviceclient import DeviceClient

class DeviceFacade(object):
    functions: Dict['string', callable]
    function_description_map: Dict['string', list]

    def __init__(self, device: DeviceClient):
        self.device = device
        self.functions = {}
        self.function_description_map = {}

        members = inspect.getmembers(device, inspect.ismethod)
        for (name, type_) in members:
            if "__" not in name and name[0] != "_":
                self.functions[name] = getattr(device, name)

        self._create_function_description_map()

    def _create_function_description_map(self):
        self.function_description_map = {}
        for i in self.functions:
            function = self.functions[i]
            signature = inspect.getfullargspec(function)
            print("Signature DEBUG:", str(signature.annotations.items()))
            parameterlist = []
            for (parameter, typea) in signature.annotations.items():
                parameterlist.append((parameter, typea.__name__))
            self.function_description_map[i] = parameterlist
        print("Function_map debug", self.function_description_map)

    def get_function_map(self):
        return self.function_description_map

    def run_function(self, function_name: str, args: list) -> str:
        # error check function name
        if self.functions.get(function_name) is not None:
            # error check args
            if len(args) != len(self.function_description_map[function_name]):
                return "Missing arguments, arguments should be "+str(self.function_description_map[function_name])
            else:
                try:
                    function = self.functions.get(function_name)
                    function(*args)
                    return "OK"
                except Exception as err:
                    return "Error: "+str(err)
        else:
            return "Function name {} does not exist".format(function_name)
        
