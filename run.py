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
        return [ { 'name' : 'Великобритания', 'eid' : 318 },
                 { 'name' : 'ОАЭ', 'eid' : 1 } ]

        return [ { 'eid' : 1,   'name' : 'ОАЭ' },
                 { 'eid' : 318, 'name' : 'Великобритания' } ]
    #sleep(2)
    if pid == 1:
        return [ { 'eid' : 23, 'name' : 'Регионы' },
                 { 'eid' : 2,  'name' : 'О стране' },
                 { 'eid' : 4,  'name' : 'Отели и цены' } ]
    if pid == 23:
        return [ { 'eid' : 26, 'name' : 'Абу-Даби' },
                 { 'eid' : 45, 'name' : 'Аджман' },
                 { 'eid' : 24, 'name' : 'Дубай' } ]



host = '0.0.0.0'
host = '127.0.0.1'
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host=host)
