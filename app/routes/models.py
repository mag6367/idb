"""
eklogi API Routes - Model JSON

This module contains the routes for model JSON.

"""
from flask import Blueprint, request

blueprint = Blueprint('Model JSON routes',
                      __name__,
                      static_folder='../static',
                      template_folder='../templates')


def pagination_parameters():
    """
    Retrieves the start index and request limit from the request parameters.

    Start defaults to 0. Limit defaults to -1.

    :return: a tuple of (start, limit)
    """
    start = request.args.get("start")
    try:
        start = int(start)
    except ValueError:  # ignore malformed parameter, use default
        start = 0
    limit = request.args.get("limit")
    try:
        limit = int(limit)
    except ValueError:  # ignore malformed parameter, use default
        limit = -1
    return start, limit


@blueprint.route('/api/v1/people')
def people():
    """
    eklogi People JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@blueprint.route('/api/v1/people/<int:id>')
def person(id):
    """
    eklogi People JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/elections')
def elections():
    """
    eklogi Elections JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@blueprint.route('/api/v1/elections/<int:id>')
def election(id):
    """
    eklogi Elections JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/districts')
def districts():
    """
    eklogi Districts JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@blueprint.route('/api/v1/districts/<int:id>')
def district(id):
    """
    eklogi Districts JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/committees')
def committees():
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@blueprint.route('/api/v1/committees/<int:id>')
def committee(id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@blueprint.route('/api/v1/filings')
def filings():
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@blueprint.route('/api/v1/filings/<int:id>')
def filing(id):
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"
