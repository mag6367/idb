"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
# pylint: disable=import-error
# pylint: disable=invalid-name
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app.routes import pages, modelpages, models, utility

app = Flask(__name__)
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)

app.register_blueprint(pages.pages)
app.register_blueprint(modelpages.modelpages)
app.register_blueprint(models.models)
app.register_blueprint(utility.utility)


def debug():
    """
    Launches the eklogi web application in debug mode.
    """
    app.run(debug=True)


def server():
    """
    Launches the eklogi web application in production mode.
    """
    app.run(host='0.0.0.0', port=80)


if __name__ == '__main__':
    debug()
