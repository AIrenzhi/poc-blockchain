from src.utils import _hash, get_address
import src.protos_pb2 as protos
from .wrappers import action
from src.constant import L0GTYPE

@action('create')
def create_log(*args):
    action = args[2].createlog()
    log = action.log
    address = get_address(args[3], log.uuid, L0GTYPE)
    container = protos.LogContainero()
    return log, address, container

