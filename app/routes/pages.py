"""
eklogi API Routes - Pages

This module contains the routes for main website HTML pages.

"""
# pylint: disable=invalid-name
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


@pages.route('/members')
def members():
    """
    eklogi People Page

    :return: 'TBD'
    """
    return render_template('search.html', title='Eklogi: Search',
                           searchscript='../static/js/people.js',
                           searchtitle='Members')


@pages.route('/committees')
def committees():
    """
    eklogi Committees Page

    :return: 'TBD'
    """
    return render_template('search.html', title='Eklogi: Search',
                           searchscript='../static/js/committees.js',
                           searchtitle='Committees')


@pages.route('/bills')
def bills():
    """
    eklogi Bills Page

    :return: 'TBD'
    """
    return render_template('search.html', title='Eklogi: Search',
                           searchscript='../static/js/bills.js',
                           searchtitle='Bills')


@pages.route('/votes')
def votes():
    """
    eklogi Votes Page

    :return: 'TBD'
    """
    return render_template('search.html', title='Eklogi: Search',
                           searchscript='../static/js/votes.js',
                           searchtitle='Votes')
