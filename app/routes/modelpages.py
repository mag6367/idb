"""
eklogi API Routes - Model Pages

This module contains the routes for individual model HTML pages.

"""
from flask import Blueprint, render_template

modelpages = Blueprint('modelpages',
                       __name__,
                       static_folder='../static',
                       template_folder='../templates')


@modelpages.route('/people/<string:id>')
def people(id):
    """
    eklogi Person Page

    :return: 'TBD'
    """
    return render_template('person.html', title='Person')


@modelpages.route('/committees/<string:id>')
def committees(id):
    """
    eklogi Committee Page

    :return: 'TBD'
    """
    return render_template('committee.html', title='Committee')


@modelpages.route('/bills/<string:id>')
def bills(id):
    """
    eklogi Bill Page

    :return: 'TBD'
    """
    return render_template('bill.html', title='Bill')


@modelpages.route('/votes/<string:id>')
def votes(id):
    """
    eklogi Vote Page

    :return: 'TBD'
    """
    return render_template('vote.html', title='Vote')


@modelpages.route('/example/<string:id>')
def example(id):
    """
    eklogi Example Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))
