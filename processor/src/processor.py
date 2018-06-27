from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.core import TransactionProcessor
from sawtooth_sdk.processor.exceptions import InvalidTransaction
from sawtooth_sdk.processor.exceptions import InternalError
from .utils import _hash


class Handler(TransactionHandler):

    def __init__(self, family_name, version, func):
        self._family_name = family_name
        self._version = version
        self._namespace_prefix = _hash(family_name)

    @property
    def family_name(self):
        return self._family_name

    @property
    def family_versions(self):
        return self._version

    @property
    def namespaces(self):
        return self._namespace_prefix

    def apply(self, transaction, context):
        func(transaction, context)


class Processor:

    def __init__(self, handler, address):
        self._processor = TransactionProcessor(address)
        self._processor.add_handler(handler)

    def start(self):
        self._processor.start()

    def stop(self):
        self._processor.stop()


