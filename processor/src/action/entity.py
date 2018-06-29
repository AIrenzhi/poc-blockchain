from src.utils import _hash, get_address
import src.protos_pb2 as protos

def create_entity(*args):
    action = args[2].createEntity
    entity = action.entity
    address = get_address(args[3], entity.uuid)
    container = protos.EntityContainer()
    container.entity.add().CopyFrom(entity)
    args[1].set_state({address: container.SerializeToString()})


def update_entity(*args):
    action = args[2].updateUser
    entity = action.entity
    address = get_address(args[3], entity.uuid)
    container_data = args[1].get_state([address])
    container = protos.EntityContainer()
    container.ParseFromString(container_data)
    container.user.add().CopyFrom(entity)
    args[1].set_state({address: container})