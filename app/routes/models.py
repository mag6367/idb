"""
eklogi API Routes - Model JSON

This module contains the routes for model JSON.

"""
# pylint: disable=invalid-name
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
    start = request.args.get("start", 0)
    try:
        start = int(start)
    except ValueError:  # ignore malformed parameter, use default
        start = 0
    limit = request.args.get("limit", -1)
    try:
        limit = int(limit)
    except ValueError:  # ignore malformed parameter, use default
        limit = -1
    return start, limit


@models.route('/api/v1/members')
def members():
    """
    eklogi Member JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/people.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/people/<string:member_id>')
def member(member_id):
    """
    eklogi People JSON

    :return: 'TBD'
    """
    with models.open_resource("../static/data/person" + member_id + ".json", mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/committees')
def committees():
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/committees.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/committees/<string:committee_id>')
def committee(committee_id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/committee' + committee_id + '.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/bills')
def bills():
    """
    eklogi Bills JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/bills.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/bills/<string:bill_id>')
def bill(bill_id):
    """
    eklogi Bill JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/bill-' + bill_id + '.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/votes')
def votes():
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/votes.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")


@models.route('/api/v1/votes/<string:vote_id>')
def vote(vote_id):
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/vote-' + vote_id + '.json', mode='r') as f:
        return Response(response="{\"success\": true, \"data\": " + f.read() + "}",
                        status="200",
                        mimetype="application/json")
