import hashlib
import logging

log = logging.getLogger(__name__)
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)

def _hash(data):
    return hashlib.sha512(data.encode()).hexdigest()