"""
eklogi API Routes - Model Pages

This module contains the routes for individual model HTML pages.

"""
from flask import Blueprint, render_template

modelpages = Blueprint('modelpages',
                       __name__,
                       static_folder='../static',
                       template_folder='../templates')


@modelpages.route('/people/<int:id>')
def people(id):
    """
    eklogi People Page

    :return: 'TBD'
    """
    return render_template('person.html', title='Person')


@modelpages.route('/elections/<int:id>')
def elections(id):
    """
    eklogi Elections Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@modelpages.route('/districts/<int:id>')
def districts(id):
    """
    eklogi Districts Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@modelpages.route('/committees/<int:id>')
def committees(id):
    """
    eklogi Committees Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@modelpages.route('/filings/<int:id>')
def filings(id):
    """
    eklogi Filings Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))
