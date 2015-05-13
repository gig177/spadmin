from flask import Flask, render_template, request, Response, g
from jsonify import jsonify
from time import sleep
import os

from database import dbsess
from models import *

from helpers.url import translit
from helpers.string import removeSpecialChars

app = Flask(__name__, template_folder='view/templates',
            static_folder='view')

@app.route('/<module>/')
@app.route('/')
def index(module=False):
    return render_template('index.html')

"""
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
"""

@app.route('/api/catalog', methods=['POST'])
@jsonify()
def create():
    fields = request.get_json()
    fields['name'] = removeSpecialChars( fields.get('name', '') )
    fields['segment'] = translit( fields['name'] )
    #print(fields)

    """
    if dbsess.query(Node).filter_by(name=fields['name']).count():
        403 or 409 error
    """

    #node = Node(fields)
    #dbsess.add(node)
    #dbsess.commit()
    return dict(id=34, name='root', title='root', created=1431015379), 201

@app.route('/api/catalog/<int:id>')
@jsonify()
def read(id):
    return dict(id=34)

@app.route('/api/catalog/<int:id>', methods=['PUT'])
@jsonify()
def update(id):
    return dict(id=34)
