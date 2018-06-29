from src.utils import _hash
import src.protos_pb2 as protos
from .wrappers import action

@action('create')
def createRole(*args):
    action = args[2].createRole
    role = action.role
    address = args[3]+_hash(role.uuid)[:64]
    container = protos.RoleContainer()
    return role, address, container


@action('update')
def updateRole(*args):
    action = args[2].updateRole
    role = action.role
    address = args[3]+_hash(role.uuid)[:64]
    container = protos.RoleContainer()
    return role, address, container


def deleteRole(*args):
    # action = args[2].deleteRole
    # uuid = action.uuid
    pass

if __name__ == '__main__':
    pass