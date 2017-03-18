"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)  # pylint: disable=invalid-name


@app.route('/')
def index():
    """
    eklogi Home Page

    :return: 'Hello World!'
    """
    return 'Hello World!'


@app.route('/template')
def template():
    """
    Rendering a template example.

    :return: the rendered hello world template
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


if __name__ == '__main__':
    app.run()
