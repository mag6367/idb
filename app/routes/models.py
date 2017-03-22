"""
eklogi API Routes - Model JSON

This module contains the routes for model JSON.

"""
from flask import Blueprint, Response, request

models = Blueprint('models',
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


@models.route('/api/v1/people')
def people():
    """
    eklogi People JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/people.json', mode='r') as people:
        return Response(response="{\"success\": true, \"data\": " + people.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/people/<string:id>')
def person(id):
    """
    eklogi People JSON

    :return: 'TBD'
    """
    with models.open_resource("../static/data/person" + id + ".json", mode='r') as person:
        return Response(response="{\"success\": true, \"data\": " + person.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/elections')
def elections():
    """
    eklogi Elections JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@models.route('/api/v1/elections/<int:id>')
def election(id):
    """
    eklogi Elections JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@models.route('/api/v1/districts')
def districts():
    """
    eklogi Districts JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@models.route('/api/v1/districts/<int:id>')
def district(id):
    """
    eklogi Districts JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@models.route('/api/v1/committees')
def committees():
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/committees_static_data.json', mode='r') as committees:
        return Response(response="{\"success\": true, \"data\": " + committees.read() + "}",
                        status="200",
                        mimetype="application/json")

@models.route('/api/v1/committees/<int:id>')
def committee(id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"


@models.route('/api/v1/filings')
def filings():
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@models.route('/api/v1/filings/<int:id>')
def filing(id):
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"
