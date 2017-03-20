"""
eklogi API Routes - Pages

This module contains the routes for main website HTML pages.

"""
from flask import Blueprint, render_template, request

blueprint = Blueprint('Main website page routes',
                      __name__,
                      static_folder='../static',
                      template_folder='../templates')


def pagination_parameters():
    """
    Retrieves the start index and request limit from the request parameters.

    Start defaults to -1. Limit defaults to 0.

    :return: a tuple of (start, limit)
    """
    return (request.args.get("start") or -1), (request.args.get("limit") or 0)


@blueprint.route('/')
def index():
    """
    eklogi Home Page

    :return: 'TBD'
    """

    return render_template('index.html')


@blueprint.route('/about')
def about():
    """
    eklogi About Page

    :return: 'TBD'
    """
    return render_template('about.html', title='About')


@blueprint.route('/people')
def people():
    """
    eklogi People Page

    :return: 'TBD'
    """
    return render_template('people.html', title='People')


@blueprint.route('/elections')
def elections():
    """
    eklogi Elections Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


@blueprint.route('/districts')
def districts():
    """
    eklogi Districts Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


@blueprint.route('/committees')
def committees():
    """
    eklogi Committees Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


@blueprint.route('/filings')
def filings():
    """
    eklogi Filings Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')
