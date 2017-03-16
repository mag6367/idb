"""
eklogi Database Models

This module contains the model classes which represent database tables.

Models all are subclasses of SQLAlchemy's Model class.

"""
from app.eklogi import db  # pylint: disable=import-error


class Person(db.Model):  # pylint: disable=too-few-public-methods
    """
    Person

    A representation of a politician profile.
    """
    pass


class Election(db.Model):  # pylint: disable=too-few-public-methods
    """
    Election

    A representation of county election metadata.
    """
    pass


class District(db.Model):  # pylint: disable=too-few-public-methods
    """
    District

    A representation of a congressional district.
    """
    pass


class Committee(db.Model):  # pylint: disable=too-few-public-methods
    """
    Committee

    A representation of an organization or committee that registered with the FEC.
    """
    pass


class Filing(db.Model):  # pylint: disable=too-few-public-methods
    """
    Filing

    A representation of an official record/report filed by or delivered to the FEC.
    """
    pass
