"""
eklogi Database Models

This module contains the model classes which represent database tables.

Models all are subclasses of SQLAlchemy's Model class.

"""
# pylint: disable=invalid-name
# pylint: disable=too-few-public-methods
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer

from app.eklogi import db  # pylint: disable=import-error


class Person(db.Model):
    """
    Person

    A representation of a politician profile.
    """
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<Person {}>'.format(id)


class Election(db.Model):
    """
    Election

    A representation of county election metadata.
    """
    __tablename__ = 'elections'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<Election {}>'.format(id)


class District(db.Model):
    """
    District

    A representation of a congressional district.
    """
    __tablename__ = 'districts'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<District {}>'.format(id)


class Committee(db.Model):
    """
    Committee

    A representation of an organization or committee that registered with the FEC.
    """
    __tablename__ = 'committees'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<Committee {}>'.format(id)


class Filing(db.Model):
    """
    Filing

    A representation of an official record/report filed by or delivered to the FEC.
    """
    __tablename__ = 'filings'
    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return '<Filing {}>'.format(id)
