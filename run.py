#!/bin/env python
from flask import Flask, render_template, request, Response
import os

app = Flask(__name__, template_folder='view/templates',
            static_folder='view')

@app.route('/admin/')
def index():
    return render_template('index.html')

host = '0.0.0.0'
host = '127.0.0.1'
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host=host)
