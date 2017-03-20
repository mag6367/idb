"""
eklogi API Routes - Model Pages

This module contains the routes for individual model HTML pages.

"""
from flask import Blueprint, render_template

blueprint = Blueprint('Individual model page views',
                      __name__,
                      static_folder='../static',
                      template_folder='../templates')


@blueprint.route('/people/<int:id>')
def people(id):
    """
    eklogi People Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@blueprint.route('/elections/<int:id>')
def elections(id):
    """
    eklogi Elections Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@blueprint.route('/districts/<int:id>')
def districts(id):
    """
    eklogi Districts Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@blueprint.route('/committees/<int:id>')
def committees(id):
    """
    eklogi Committees Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))


@blueprint.route('/filings/<int:id>')
def filings(id):
    """
    eklogi Filings Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World! id: {}'.format(id))
