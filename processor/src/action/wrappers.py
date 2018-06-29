from src.utils import log

def action(tp):
    def func(foo):
        def wrapper(*args):
            params = foo(*args)
            if tp is 'create':
                params[2].entries.add().CopyFrom(params[0])
                flag = args[1].set_state({params[1]: params[2].SerializeToString()})
            if tp is 'update':
                container_data = args[1].get_state([params[1]])
                if len(container_data) < 1:
                    log.error('state has no this address')
                params[2].ParseFromString(container_data[0].data)
                params[2].entries.add().CopyFrom(params[0])
                flag = args[1].set_state({params[1]: params[2].SerializeToString()})
            return flag
        return wrapper
    return func

