"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from routes import pages, modelpages, models, utility

app = Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)  # pylint: disable=invalid-name

app.register_blueprint(pages.blueprint)
app.register_blueprint(modelpages.blueprint)
app.register_blueprint(models.blueprint)
app.register_blueprint(utility.blueprint)

if __name__ == '__main__':
    app.run()
