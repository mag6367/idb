"""
eklogi API Routes - Pages

This module contains the routes for main website HTML pages.

"""
from flask import Blueprint, render_template

pages = Blueprint('pages',
                  __name__,
                  static_folder='../static',
                  template_folder='../templates')


@pages.route('/')
def index():
    """
    eklogi Home Page

    :return: 'TBD'
    """

    return render_template('index.html')


@pages.route('/about')
def about():
    """
    eklogi About Page

    :return: 'TBD'
    """
    return render_template('about.html', title='About')


@pages.route('/people')
def people():
    """
    eklogi People Page

    :return: 'TBD'
    """
    return render_template('people.html', title='People')


@pages.route('/elections')
def elections():
    """
    eklogi Elections Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


@pages.route('/districts')
def districts():
    """
    eklogi Districts Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


@pages.route('/committees')
def committees():
    """
    eklogi Committees Page

    :return: 'TBD'
    """
    return render_template('committees.html', title='Committees')


@pages.route('/filings')
def filings():
    """
    eklogi Filings Page

    :return: 'TBD'
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')
