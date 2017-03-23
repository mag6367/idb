"""
eklogi API Routes - Model JSON

This module contains the routes for model JSON.

"""
# pylint: disable=invalid-name
# pylint: disable=unused-argument
from functools import wraps

from flask import Blueprint, Response, request

models = Blueprint('models',
                   __name__,
                   static_folder='../static',
                   template_folder='../templates')


def fallback(f):
    """
    Swallows any internal server error and returns a proper JSON error response.

    :param f: the original route function
    :return: the wrapped route function with the fallback
    """

    @wraps
    def wrapped(*args, **kwargs):
        """
        Invokes the route function, falling back to a JSON error response.

        :param args: original route positional arguments
        :param kwargs: original route keyword arguments
        :return: a valid response or JSON error response
        """
        try:
            return f(args, kwargs)
        except Exception as e:  # pylint: disable=broad-except
            return Response(response='{"success": false, "data": '
                                     '{"error": "' + type(e).__name__ + '"}}',
                            status='400',
                            mimetype='application/json')

    return wrapped


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
@fallback
def members():
    """
    eklogi Member JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/people.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/members/<string:member_id>')
@fallback
def member(member_id):
    """
    eklogi People JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/person' + member_id + '.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/committees')
@fallback
def committees():
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/committees.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/committees/<string:committee_id>')
@fallback
def committee(committee_id):
    """
    eklogi Committees JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/committee' + committee_id + '.json',
                              mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/bills')
@fallback
def bills():
    """
    eklogi Bills JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/bills.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/bills/<string:bill_id>')
@fallback
def bill(bill_id):
    """
    eklogi Bill JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/bill-' + bill_id + '.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/votes')
@fallback
def votes():
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/votes.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')


@models.route('/api/v1/votes/<string:vote_id>')
@fallback
def vote(vote_id):
    """
    eklogi Votes JSON

    :return: 'TBD'
    """
    with models.open_resource('../static/data/sample/vote' + vote_id + '.json', mode='r') as f:
        return Response(response='{"success": true, "data": ' + f.read() + '}',
                        status='200',
                        mimetype='application/json')
