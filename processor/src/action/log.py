from src.utils import _hash, get_address
import src.protos_pb2 as protos
from .wrappers import action

@action('create')
def create_log(*args):
    action = args[2].createlog()
    log = action.log
    address = get_address(args[3], log.uuid)
    container = protos.LogContainero()
    return log, address, container

