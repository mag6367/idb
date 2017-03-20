"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

from routes import pages, modelpages, models, utility

app = Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)  # pylint: disable=invalid-name


def pagination_parameters():
    """
    Retrieves the start index and request limit from the request parameters.

    Start defaults to -1. Limit defaults to 0.

    :return: a tuple of (start, limit)
    """
    return request.args.get("start") or -1, request.args.get("limit") or 0


app.register_blueprint(pages.blueprint)
app.register_blueprint(modelpages.blueprint)
app.register_blueprint(models.blueprint)
app.register_blueprint(utility.blueprint)

if __name__ == '__main__':
    app.run()
