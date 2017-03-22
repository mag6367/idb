"""
eklogi Database Models

This module contains the model classes which represent database tables.

Models all are subclasses of SQLAlchemy's Model class.

"""
# pylint: disable=invalid-name
# pylint: disable=too-few-public-methods
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import String, Date, DateTime

from app.eklogi import db  # pylint: disable=import-error


class Bill(db.Model):
    """
    Bill

    A representation of a bill voted on by congress.
    """
    __tablename__ = 'bills'
    id = Column(String, primary_key=True)
    title = Column(String)
    subject = Column(String)
    summary = Column(String)
    introduced_date = Column(Date)
    house_passage_date = Column(Date)
    senate_passage_date = Column(Date)
    sponsor_id = Column(String)

    def __repr__(self):
        return '<Bill {}>'.format(id)


# Add association table for Member -> Committee (member_id, committee_code)

class Member(db.Model):
    """
    Member

    A representation of a politician profile.
    """
    __tablename__ = 'members'
    id = Column(String, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(Date)
    party = Column(String)
    chamber = Column(String)
    title = Column(String)
    state = Column(String)
    district = Column(String)
    website = Column(String)
    facebook_alias = Column(String)
    twitter_alias = Column(String)

    def __repr__(self):
        return '<Person {}>'.format(id)


class Committee(db.Model):
    """
    Committee

    A representation of an organization or committee that registered with the FEC.
    """
    __tablename__ = 'committees'
    id = Column(String, primary_key=True)
    chair_id = Column(String)
    name = Column(String)
    website = Column(String)
    chamber = Column(String)

    def __repr__(self):
        return '<Committee {}>'.format(id)


class Vote(db.Model):
    """
    Vote

    A representation of a individual member vote on a bill motion.
    """
    __tablename__ = 'votes'
    id = Column(String, primary_key=True)
    bill_id = Column(String)
    member_id = Column(String)
    date = Column(DateTime)
    question = Column(String)
    description = Column(String)
    position = Column(String)

    def __repr__(self):
        return '<Vote {}>'.format(id)
