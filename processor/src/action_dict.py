import src.protos_pb2 as protos
from .action.entity import *
from .action.role import *
from .action.concept import *
from .action.log import *
from .action.user import *

Actions = {
    protos.CREATE_ROLE: createRole,
    protos.UPDATE_ROLE: updateRole,
    protos.CREATE_USER: createUser,
    protos.UPDATE_USER: updateUser,
    protos.CREATE_CONCEPT: create_concept,
    protos.UPDATE_CONCEPT: update_concept,
    protos.CREATE_ENTITY: create_entity,
    protos.UPDATE_ENTITY: update_entity,
    protos.CREATE_LOG: create_log,
}

