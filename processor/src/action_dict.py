import src.protos_pb2 as protos
from .action.entity import *
from .action.role import *
from .action.concept import *
from .action.log import *
from .action.user import *

Actions = {
    protos.CREATEROLE: createRole,
    protos.UPDATEROLE: updateRole,
    protos.CREATEUSER: createUser,
    protos.UPDATEUSER: updateUser,
    protos.CREATECONCEPT: create_concept,
    protos.UPDATECONCEPT: update_concept,
    protos.CREATEENTITY: create_entity,
    protos.UPDATEENTITY: update_entity,
    protos.CREATELOG: create_log,
}

