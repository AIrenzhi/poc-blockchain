from src.utils import _hash, get_address
import src.protos_pb2 as protos


def create_concept(*args):
    action = args[2].createConcept
    concept = action.concept
    address = get_address(args[3], concept.uuid)
    container = protos.ConceptContainer()
    container.concept.add().CopyFrom(concept)
    args[1].set_state({address: container.SerializeToString()})

def update_concept(*args):
    action = args[2].updateConcept
    concept = action.concept
    address = get_address(args[3], concept.uuid)
    data = args[1].get_state([address])
    container = protos.ConceptContainer()
    container.ParseFromString(data)
    container.concept.add().CopyFrom(concept)
    args[1].set_state({address: container.SerializeToString()})


