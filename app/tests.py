"""
eklogi Unit Tests

This module contains unit tests for all backend routes and models.

Route tests ensure attempts to reach a route return a 200 OK response and the data is well formed.

Model unit tests ensure database schema validity, testing for loading, saving, and updating entries.

"""
# pylint: disable=too-many-public-methods
from unittest import main, TestCase

from app.eklogi import app  # pylint: disable=import-error


def route(path, *, method='get', code=200):  # pylint: disable=no-self-argument
    """
    Performs a basic check against a route.

    :param path: the route path to query
    :param method: the name of the method to perform on the client (get, post, etc.)
    :param code: the response code to expect from the route
    :return: the route check wrapper
    """

    def wrap(f):  # pylint: disable=invalid-name
        """
        Returns a decorator which performs all response checks.

        :param f: the function to perform additional response checks
        :return: the check function to query client and test the response
        """

        def check(self):
            """
            Queries the client at the specified route, checking the status and data.

            """
            res = getattr(self.app, method)(path)
            self.assertIn(str(code), res.status)
            f(self, res)

        return check

    return wrap


class EklogiTests(TestCase):
    """
    EklogiTests

    A collection of unit tests for backend routes and models.
    """

    def setUp(self):
        self.app = app.test_client()

    @route('/')
    def test_index(self, res):
        """
        Checks the route to '/' exists.
        """
        pass

    @route('/about')
    def test_about(self, res):
        """
        Checks the route to '/about' exists.
        """
        pass

    @route('/bills')
    def test_bills(self, res):
        """
        Checks the route to '/bills' exists.
        """
        pass

    @route('/committees')
    def test_committees(self, res):
        """
        Checks the route to '/committees' exists.
        """
        pass

    @route('/members')
    def test_members(self, res):
        """
        Checks the route to '/members' exists.
        """
        pass

    @route('/votes')
    def test_votes(self, res):
        """
        Checks the route to '/votes' exists.
        """
        pass

    @route('/api/v1/quotes')
    def test_quotes(self, res):
        """
        Checks the route to '/api/v1/quotes' exists.
        """
        pass

    @route('/api/v1/americanhero')
    def test_sloth(self, res):
        """
        Checks the route to '/api/v1/americanhero' exists.
        """
        pass

    @route('/bills/hr21-115')
    def test_bill(self, res):
        """
        Checks the route to '/bills' exists.
        """
        pass

    @route('/committees/HSAG')
    def test_committee(self, res):
        """
        Checks the route to '/committees' exists.
        """
        pass

    @route('/members/K000388')
    def test_member(self, res):
        """
        Checks the route to '/members' exists.
        """
        pass

    @route('/votes/Senate-1-1')
    def test_vote(self, res):
        """
        Checks the route to '/votes' exists.
        """
        pass

    @route('/api/v1/bills/hr21-115')
    def test_bill_json(self, res):
        """
        Checks the route to '/api/v1/bills' exists.
        """
        pass

    @route('/api/v1/bills')
    def test_bills_json(self, res):
        """
        Checks the route to '/api/v1/bills' exists.
        """
        pass

    @route('/api/v1/committees/HSAG')
    def test_committee_json(self, res):
        """
        Checks the route to '/api/v1/committees' exists.
        """
        pass

    @route('/api/v1/committees')
    def test_committees_json(self, res):
        """
        Checks the route to '/api/v1/committees' exists.
        """
        pass

    @route('/api/v1/members/K000388')
    def test_member_json(self, res):
        """
        Checks the route to '/api/v1/members' exists.
        """
        pass

    @route('/api/v1/members')
    def test_members_json(self, res):
        """
        Checks the route to '/api/v1/members' exists.
        """
        pass

    @route('/api/v1/votes/Senate-1-1')
    def test_vote_json(self, res):
        """
        Checks the route to '/api/v1/votes' exists.
        """
        pass

    @route('/api/v1/votes')
    def test_votes_json(self, res):
        """
        Checks the route to '/api/v1/votes' exists.
        """
        pass


if __name__ == '__main__':
    main()
