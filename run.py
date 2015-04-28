#!/bin/env python
from app import app

host = '0.0.0.0'
host = '127.0.0.1'
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host=host)