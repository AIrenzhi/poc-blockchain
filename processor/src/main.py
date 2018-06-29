import src.protos_pb2 as structure
from src.processor import Handler,Processor
from src.action_dict import Actions
from src.utils import _hash, log

url = 'tcp://10.9.70.170:4004'
family_name = 'poc-blockchain'
version = ['1.0']

def func(transation, context):
    print('----')
    try:
        payload = structure.Payload()
        payload.ParseFromString(transation.payload)
        print(payload)
        log.info(payload)
        name_space = _hash(family_name)[:6]
        Actions[payload.action](transation, context, payload, name_space)
    except Exception as e:
        print(e)
        log.exception(e)


if __name__ == '__main__':
    handler = Handler(family_name, version, func)
    processor = Processor(handler, url)
    processor.start()
    # entity = structure.Entity()
    # entity1 = structure.Entity()
    # entity.childs.append(entity1)
