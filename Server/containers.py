from dependency_injector import providers, containers
from Server.devicelistener import DeviceListener
from Server.devicecontroller import DeviceController
from Server.deviceapi import DeviceAPI


class ServerContainer(containers.DeclarativeContainer):

    config = providers.Configuration('config')
    logger = None

    device_controller:DeviceController = providers.Singleton(
        DeviceController,
        logger=None
    )

    device_listener:DeviceListener = providers.Singleton(
        DeviceListener,
        device_controller=device_controller,
        logger=None
    )

    device_api: DeviceAPI = providers.Singleton(
        DeviceAPI,
        device_controller=device_controller
    )


