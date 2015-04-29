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

@app.route('/api/catalog/', methods=['POST'])
@jsonify()
def create():
    return dict(id=34), 201
    #return Response('hello', 201)