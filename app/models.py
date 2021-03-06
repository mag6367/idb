"""
eklogi Database Models

This module contains the model classes which represent database tables.

Models all are subclasses of SQLAlchemy's Model class.

"""
# pylint: disable=fixme
# pylint: disable=invalid-name
# pylint: disable=missing-format-argument-key
# pylint: disable=too-few-public-methods
# pylint: disable=too-many-arguments
# pylint: disable=too-many-instance-attributes
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer, Date, DateTime, String

from app.eklogi import db  # pylint: disable=import-error


# TODO: Add association table for Member -> Committee (member_id, committee_code) in Phase 2
# TODO: Add relational mappings, instead of raw ids in Phase 2

class Bill(db.Model):
    """
    Bill

    A representation of a bill voted on by congress.
    """
    __tablename__ = 'bills'
    id = Column(String, primary_key=True)
    code = Column(String)
    title = Column(String)
    subject = Column(String)
    summary = Column(String)
    introduced_date = Column(Date)
    committee_name = Column(String)
    house_passage_date = Column(Date)
    senate_passage_date = Column(Date)
    sponsor_id = Column(String)

    def __init__(self, id, title, code, subject, summary, introduced_date,
                 committee_name, house_passage_date, senate_passage_date, sponsor_id):
        assert id
        self.id = id
        self.title = title
        self.code = code
        self.subject = subject
        self.summary = summary
        self.introduced_date = introduced_date
        self.committee_name = committee_name
        self.house_passage_date = house_passage_date
        self.senate_passage_date = senate_passage_date
        self.sponsor_id = sponsor_id

    def __repr__(self):
        return '<Bill {id: {}, code: {}, title: {}, subject: {}, summary: {}, ' \
               'introduced_date: {}, house_passage_date: {}, ' \
               'senate_passage_date: {}, sponsor_id: {}}>'. \
            format(self.id, self.code, self.title, self.subject, self.summary, self.introduced_date,
                   self.house_passage_date, self.senate_passage_date, self.sponsor_id)


class Member(db.Model):
    """
    Member

    A representation of a politician profile.
    """
    __tablename__ = 'members'
    id = Column(String, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    picture_url = Column(String)
    dob = Column(Date)
    party = Column(String)
    chamber = Column(String)
    title = Column(String)
    state = Column(String)
    district = Column(String)
    website = Column(String)
    facebook_alias = Column(String)
    twitter_alias = Column(String)
    term_start = Column(Date)
    term_end = Column(Date)

    def __init__(self, id, first_name, last_name, picture_url, dob, party, chamber, title,
                 state, district, website, facebook_alias, twitter_alias,
                 term_start, term_end):
        assert id
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.picture_url = picture_url
        self.dob = dob
        self.party = party
        self.chamber = chamber
        self.title = title
        self.state = state
        self.district = district
        self.website = website
        self.facebook_alias = facebook_alias
        self.twitter_alias = twitter_alias
        self.term_start = term_start
        self.term_end = term_end

    def __repr__(self):
        return '<Person {id: {}, first_name: {}, last_name: {}, picture_url: {}, dob: {}, ' \
               'party: {}, chamber: {}, title: {}, state: {}, district: {}, ' \
               'website: {}, facebook_alias: {}, twitter_alias: {},' \
               'term_start: {}, term_end: {}}>'. \
            format(self.id, self.first_name, self.last_name, self.picture_url, self.dob, self.party,
                   self.chamber, self.title, self.state, self.district, self.website,
                   self.facebook_alias, self.twitter_alias, self.term_start, self.term_end)


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
    size = Column(Integer)

    def __init__(self, chair_id, name, website, chamber, size):
        assert chair_id
        self.chair_id = chair_id
        self.name = name
        self.website = website
        self.chamber = chamber
        self.size = size

    def __repr__(self):
        return '<Committee {id: {}, chair_id: {}, name: {}, website: {}, ' \
               'chamber: {}, size: {}}>'. \
            format(self.id, self.chair_id, self.name,
                   self.website, self.chamber, self.size)


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

    def __init__(self, bill_id, member_id, date, question, description, position):
        assert bill_id
        self.bill_id = bill_id
        self.member_id = member_id
        self.date = date
        self.question = question
        self.description = description
        self.position = position

    def __repr__(self):
        return '<Vote {id: {}, bill_id: {}, member_id: {}, date: {}, ' \
               'question: {}, description: {}, position: {}}>'. \
            format(self.id, self.bill_id, self.member_id, self.date,
                   self.question, self.description, self.position)
