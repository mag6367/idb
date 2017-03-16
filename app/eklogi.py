"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('config.TestingConfig')
db = SQLAlchemy(app)  # pylint: disable=invalid-name


@app.route('/')
def index():
    """
    eklogi Home Page

    :return: 'Hello World!'
    """
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
