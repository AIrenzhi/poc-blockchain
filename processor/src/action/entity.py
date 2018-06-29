from src.utils import _hash, get_address
import src.protos_pb2 as protos
from .wrappers import action

@action('create')
def create_entity(*args):
    action = args[2].createEntity
    entity = action.entity
    address = get_address(args[3], entity.uuid)
    container = protos.EntityContainer()
    return entity, address, container

@action('update')
def update_entity(*args):
    action = args[2].updateUser
    entity = action.entity
    address = get_address(args[3], entity.uuid)
    container = protos.EntityContainer()
    return entity, address, container