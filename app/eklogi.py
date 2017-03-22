"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
# pylint: disable=import-error
# pylint: disable=invalid-name
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from routes import pages, modelpages, models, utility

app = Flask(__name__)
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)

app.register_blueprint(pages.pages)
app.register_blueprint(modelpages.modelpages)
app.register_blueprint(models.models)
app.register_blueprint(utility.utility)

if __name__ == '__main__':
    app.run()
