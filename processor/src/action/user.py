from src.utils import _hash, get_address
import src.protos_pb2 as protos


def createUser(*args):
    action = args[2].createUser
    user = action.user
    address = get_address(args[3], user.key)
    container = protos.UserContainer()
    container.users.add().CopyFrom(user)
    args[1].set_state({address: container.SerializeToString()})

def updateUser(*args):
    action = args[2].updateUser
    user = action.user
    address = get_address(args[3], user.key)
    container_data = args[1].get_state([address])
    container = protos.UserContainer()
    container.ParseFromString(container_data)
    container.user.add().CopyFrom(user)
    args[1].set_state({address: container})

if __name__ == '__main__':
    user = protos.User()
    user.key = 'sadas'
    user.name = '2113'
    container = protos.UserContainer()
    u = container.users.add().CopyFrom(user)
    # u.
    user.name = 'wwwwww'
    u = container.users.add().CopyFrom(user)
    # u.
    print(container.users)
    print(dir(u))

