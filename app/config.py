"""
eklogi Flask Configuration

This module contains flask configuration objects for different environments.

All uppercase attributes of the config object will be passed to the Flask application.

"""


class Config(object):  # pylint: disable=too-few-public-methods
    """
    Config

    Base configuration for launching in any environment.
    """
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):  # pylint: disable=too-few-public-methods
    """
    TestingConfig

    Database/Flask configuration for launching locally.
    """
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory:'


class ProductionConfig(Config):  # pylint: disable=too-few-public-methods
    """
    ProductionConfig

    Database/Flask configuration for launching on AWS production server.
    """
    SQLALCHEMY_DATABASE_URI = 'sqlite://:memory:'
