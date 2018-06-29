from src.utils import _hash, get_address
import src.protos_pb2 as protos
from .wrappers import action

@action('create')
def createUser(*args):
    action = args[2].createUser
    user = action.user
    address = get_address(args[3], user.key)
    container = protos.UserContainer()
    return user, address, container

@action('update')
def updateUser(*args):
    action = args[2].updateUser
    user = action.user
    address = get_address(args[3], user.key)
    container = protos.UserContainer()
    return user, address, container

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

