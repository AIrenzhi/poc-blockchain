import processor.src.structure_pb2 as structure
# from .processor import Handler, Processor

url = '192.168.1.129'


def func(transation, context):
    payload = structure.Payload()
    payload.ParseFromString(transation.payload)
    # payload.action

if __name__ == '__main__':
    pass
