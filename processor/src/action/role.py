from src.utils import _hash,get_address
import src.protos_pb2 as protos
from .wrappers import action
from src.constant import ROLETYPR

@action('create')
def createRole(*args):
    action = args[2].createRole
    role = action.role
    address = get_address(args[3], role.uuid, ROLETYPR)
    container = protos.RoleContainer()
    return role, address, container


@action('update')
def updateRole(*args):
    action = args[2].updateRole
    role = action.role
    address = get_address(args[3], role.uuid, ROLETYPR)
    container = protos.RoleContainer()
    return role, address, container


def deleteRole(*args):
    # action = args[2].deleteRole
    # uuid = action.uuid
    pass

if __name__ == '__main__':
    pass