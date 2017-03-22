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

@models.route('/api/v1/committees')
def committees():
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    # return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"
    with models.open_resource('../static/data/committees.json', mode='r') as committees:
        return Response(response="{\"success\": true, \"data\": " + committees.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/committees/<string:id>')
def committee(id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/committee' + id + '.json', mode='r') as committee:
        return Response(response="{\"success\": true, \"data\": " + committee.read() + "}",
                        status="200",
                        mimetype="application/json")

@models.route('/api/v1/bills')
def bills():
    """
    eklogi Bills JSON

    :return: 'TBD'
    """
    # return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"
    with models.open_resource('../static/data/bills.json', mode='r') as bills:
        return Response(response="{\"success\": true, \"data\": " + bills.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/bills/<string:id>')
def bill(id):
    """
    eklogi Bill JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/bill-' + id + '.json', mode='r') as bill:
        print("HERE")
        return Response(response="{\"success\": true, \"data\": " + bill.read() + "}",
                        status="200",
                        mimetype="application/json")

@models.route('/api/v1/votes')
def votes():
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    # return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"
    with models.open_resource('../static/data/votes.json', mode='r') as votes:
        return Response(response="{\"success\": true, \"data\": " + votes.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/votes/<string:id>')
def vote(id):
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/bill' + id + '.json', mode='r') as vote:
        return Response(response="{\"success\": true, \"data\": " + vote.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/example')
def examples():
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    params = pagination_parameters()
    return "{\"success\": true, data: {id: " + str(id) + ", params: \"" + str(params) + "\"}}"


@models.route('/api/v1/example/<int:id>')
def example(id):
    """
    eklogi Filings JSON

    :return: 'TBD'
    """
    return "{\"success\": true, data: {id: " + str(id) + "}}"
