#!/bin/env python
from flask import Flask, render_template, request, Response
from jsonify import jsonify
from time import sleep
import os

app = Flask(__name__, template_folder='view/templates',
            static_folder='view')

@app.route('/<module>/')
@app.route('/')
def index(module=False):
    return render_template('index.html')

@app.route('/api/catalog/')
@app.route('/api/catalog/<int:pid>/children/')
@jsonify()
def catalogChildren(pid=False):
    if not pid:
        return [ { 'name' : 'ОАЭ', 'eid' : 1 },
                 { 'name' : 'Великобритания', 'eid' : 318 } ]
    #sleep(2)
    return [ { 'name' : 'Регионы', 'eid' : 23 },
             { 'name' : 'О стране', 'eid' : 2 } ]

host = '0.0.0.0'
host = '127.0.0.1'
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host=host)
