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
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<Person {}>'.format(id)


class Election(db.Model):  # pylint: disable=too-few-public-methods
    """
    Election

    A representation of county election metadata.
    """
    __tablename__ = 'elections'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<Election {}>'.format(id)


class District(db.Model):  # pylint: disable=too-few-public-methods
    """
    District

    A representation of a congressional district.
    """
    __tablename__ = 'districts'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<District {}>'.format(id)


class Committee(db.Model):  # pylint: disable=too-few-public-methods
    """
    Committee

    A representation of an organization or committee that registered with the FEC.
    """
    __tablename__ = 'committee'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<Committee {}>'.format(id)


class Filing(db.Model):  # pylint: disable=too-few-public-methods
    """
    Filing

    A representation of an official record/report filed by or delivered to the FEC.
    """
    __tablename__ = 'filings'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<Filing {}>'.format(id)
