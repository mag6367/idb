"""
eklogi Flask Application

This module contains the backend application for the eklogi website.

"""
import os
from flask import Flask, render_template, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('app.config.TestingConfig')
db = SQLAlchemy(app)  # pylint: disable=invalid-name


@app.route('/')
def index():
    """
    eklogi Home Page

    :return: 'TBD'
    """
    print("Serving the rooooooot!")
    return render_template('index.html')

@app.route('/people')
def people():
    """
    eklogi People listing

    :return: 'TBD'
    """

    req_id = request.args.get("id")
    print(req_id)
    if req_id:
        # if the request has the ID parameter, treat it as accessing a single user
        return render_template('person.html')
    else:
        # otherwise, return the people search page
        return render_template('people.html')


@app.route('/elections')
def elections():
    """
    eklogi Election listing

    :return: 'TBD'
    """
    req_id = request.args.get("id")
    print(req_id)
    if req_id:
        # if the request has the ID parameter, treat it as accessing a single user
        return render_template('person.html')
    else:
        # otherwise, return the people search page
        return render_template('people.html')

@app.route('/districts')
def districts():
    """
    eklogi District listing

    :return: 'TBD'
    """
    req_id = request.args.get("id")
    print(req_id)
    if req_id:
        # if the request has the ID parameter, treat it as accessing a single user
        return render_template('person.html')
    else:
        # otherwise, return the people search page
        return render_template('people.html')

@app.route('/committees')
def committees():
    """
    eklogi Committee listing

    :return: 'TBD'
    """
    req_id = request.args.get("id")
    print(req_id)
    if req_id:
        # if the request has the ID parameter, treat it as accessing a single user
        return render_template('person.html')
    else:
        # otherwise, return the people search page
        return render_template('people.html')

@app.route('/filings')
def filings():
    """
    eklogi Filing listing

    :return: 'TBD'
    """
    req_id = request.args.get("id")
    print(req_id)
    if req_id:
        # if the request has the ID parameter, treat it as accessing a single user
        return render_template('person.html')
    else:
        # otherwise, return the people search page
        return render_template('people.html')


@app.route('/api/v1/quotes')
def quotes():
    """
    stuff

    :return: 'returns the quotes json file'
    """
    # SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    # json_url = os.path.join(SITE_ROOT, "static/data", "quotes.json")
    # data = json.load(open(json_url))
    return send_from_directory('./static/data', 'quotes.json')


@app.route('/template')
def template():
    """
    Rendering a template example.

    :return: the rendered hello world template
    """
    return render_template('template.html', title='Hello World Example!', body='Hello World!')


if __name__ == '__main__':
    app.run()
