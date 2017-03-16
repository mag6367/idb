"""
eklogi Flask Configuration

This module contains flask configuration objects for different environments.

All uppercase attributes of the config object will be passed to the Flask application.

"""


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    # TODO: Convert to Postgresql connection string once database is setup.
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory:'


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory:'
