from src.utils import _hash
import src.protos_pb2 as protos

def createRole(*args):
    action = args[2].createRole
    role = action.role
    address = args[3]+_hash(role.uuid)[:64]
    container = protos.RoleContainer()
    container.roles.add().CopyFrom(role)
    args[1].set_state({address: container.SerializeToString()})


def updateRole(*args):
    action = args[2].updateRole
    role = action.role
    address = args[3]+_hash(role.uuid)[:64]
    container_data = args[1].get_state([address])
    container = protos.RoleContainer()
    container.ParseFromString(container_data)
    container.roles.add().CopyFrom(role)
    args[1].set_state({address: container.SerializeToString()})

def deleteRole(*args):
    # action = args[2].deleteRole
    # uuid = action.uuid
    pass

if __name__ == '__main__':
    pass