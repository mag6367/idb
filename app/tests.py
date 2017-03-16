"""
eklogi Unit Tests

This module contains unit tests for all backend routes and models.

Route tests ensure attempts to reach a route return a 200 OK response and the data is well formed.

Model unit tests ensure database schema validity, testing for loading, saving, and updating entries.

"""
from unittest import main, TestCase

from app.eklogi import app  # pylint: disable=import-error


class EklogiTests(TestCase):
    """
    EklogiTests

    A collection of unit tests for backend routes and models.
    """

    def setUp(self):
        self.app = app.test_client()

    def test_index(self):
        """
        Checks the route to '/' exists and returns the test string 'Hello World'
        """
        res = self.app.get('/')
        self.assertEqual('200 OK', res.status)
        self.assertEqual(b'Hello World!', res.data)


if __name__ == '__main__':
    main()
