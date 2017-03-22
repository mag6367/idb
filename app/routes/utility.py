"""
eklogi API Routes - Utility

This module contains utility routes for testing purposes or non-model related content.

"""
# pylint: disable=invalid-name
from flask import Blueprint, send_from_directory

utility = Blueprint('utility',
                    __name__,
                    static_folder='../static',
                    template_folder='../templates')


@utility.route('/api/v1/quotes')
def quotes():
    """
    Retrieves the quote JSON file.

    :return: 'returns the quotes json file'
    """
    return send_from_directory('static/data', 'quotes.json')


@utility.route('/api/v1/americanhero')
def sloth():
    """
    Retrieves the astronaut sloth image.

    :return: 'returns a picture of the astronaut sloth'
    """
    return send_from_directory('static/img', 'astronaut-sloth.jpg')
