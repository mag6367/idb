"""
eklogi Unit Tests

This module contains unit tests for all backend routes and models.

Route tests ensure attempts to reach a route return a 200 OK response and the data is well formed.

Model unit tests ensure database schema validity, testing for loading, saving, and updating entries.

"""
from functools import wraps
from unittest import main, TestCase

from app.eklogi import app  # pylint: disable=import-error


class EklogiTests(TestCase):
    """
    EklogiTests

    A collection of unit tests for backend routes and models.
    """

    def setUp(self):
        self.app = app.test_client()

    @wraps
    def routeCheck(self, f):
        """
        Performs a basic check against a route.

        The route meta data must be an iterable which contains the
        route path, response code/status, and expected result.

        :param f: the route meta data
        :param extra: any extra checks to perform on the response
        :return: the route check wrapper
        """
        route, code, expected = f()

        def check():
            """
            Queries the client at the specified route, checking the status and data.
            """
            res = self.app.get(route)
            self.assertEqual(code, res.status)
            self.assertEqual(expected, res.data)

        return check

    @routeCheck
    def test_index(self):
        """
        Checks the route to '/' exists and returns the test string 'Hello World'.
        """
        return '/', '200 OK', b'Hello World!'


if __name__ == '__main__':
    main()
