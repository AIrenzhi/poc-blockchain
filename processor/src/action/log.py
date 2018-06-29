from src.utils import _hash, get_address
import src.protos_pb2 as protos


def create_log(*args):
    action = args[2].createlog()
    log = action.log
    address = get_address(args[3], log.uuid)
    container = protos.EntityContainer()
    container.entity.add().CopyFrom(log)
    args[1].set_state({address: container.SerializeToString()})

