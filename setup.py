#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup

setup(
    name='eklogi',
    version='0.0.1',
    description='eklogi',
    author='eklogi',
    author_email='downing@cs.utexas.edu',
    url='http://eklogi.me',
    packages=['app', 'app.routes'],
    entry_points={
        'console_scripts': [
            'start-server = app.eklogi:server',
            'start-debug = app.eklogi:debug'
        ],
    },
    package_dir={'app': 'app'},
    include_package_data=True,
    install_requires=['autopep8', 'coverage', 'pylint', 'flask', 'flask-sqlalchemy'],
    license="BSD",
    zip_safe=False,
    keywords='',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3.5',
    ],
)
