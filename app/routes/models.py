"""
eklogi API Routes - Model JSON

This module contains the routes for model JSON.

"""
from flask import Blueprint

blueprint = Blueprint('Model JSON routes',
                      __name__,
                      static_folder='../static',
                      template_folder='../templates')


@blueprint.route('/api/v1/people/<int:id>')
def people_individual(id):
    """
    eklogi People JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/elections/<int:id>')
def elections_individual(id):
    """
    eklogi Elections JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/districts/<int:id>')
def districts_individual(id):
    """
    eklogi Districts JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/committees/<int:id>')
def committees_individual(id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/filings/<int:id>')
def filings_individual(id):
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"
