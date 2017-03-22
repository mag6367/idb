"""
eklogi API Routes - Model Pages

This module contains the routes for individual model HTML pages.

"""
# pylint: disable=invalid-name
# pylint: disable=unused-argument
from flask import Blueprint, render_template

modelpages = Blueprint('modelpages',
                       __name__,
                       static_folder='../static',
                       template_folder='../templates')


@modelpages.route('/people/<string:member_id>')
def member(member_id):
    """
    eklogi Member Page

    :return: 'TBD'
    """
    return render_template('person.html', title='Member')


@modelpages.route('/committees/<string:committee_id>')
def committee(committee_id):
    """
    eklogi Committee Page

    :return: 'TBD'
    """
    return render_template('committee.html', title='Committee')


@modelpages.route('/bills/<string:bill_id>')
def bill(bill_id):
    """
    eklogi Bill Page

    :return: 'TBD'
    """
    return render_template('bill.html', title='Bill')


@modelpages.route('/votes/<string:vote_id>')
def vote(vote_id):
    """
    eklogi Vote Page

    :return: 'TBD'
    """
    return render_template('vote.html', title='Vote')
