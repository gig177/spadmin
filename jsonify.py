from flask import Response
from functools import wraps
from json import dumps

def jsonify(Model=None):
    def decoratorWrapper(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            resp = f(*args, **kwargs)
            status = None
            if isinstance(resp, tuple):
                resp, status = resp
            if Model is not None:
                if isinstance(resp, list) and isinstance(resp[0], Model):
                    resp = [obj.serializable for obj in resp]
                elif isinstance(resp, Model):
                    resp = resp.serializable
            return Response(dumps(resp), status=status, mimetype='application/json')
        return wrapper
    return decoratorWrapper