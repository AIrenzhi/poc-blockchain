from src.utils import _hash, get_address
import src.protos_pb2 as protos
from .wrappers import action


@action('create')
def create_concept(*args):
    action = args[2].createConcept
    concept = action.concept
    address = get_address(args[3], concept.uuid)
    container = protos.ConceptContainer()
    return concept, address, container

@action('update')
def update_concept(*args):
    action = args[2].updateConcept
    concept = action.concept
    address = get_address(args[3], concept.uuid)
    container = protos.ConceptContainer()
    return concept, address, container


