import hashlib
import logging

log = logging.getLogger(__name__)
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)

def _hash(data):
    return hashlib.sha512(data.encode()).hexdigest()

def get_address(name_space, uuid):
    return _hash(name_space)[:6]+_hash(uuid)[:64]

