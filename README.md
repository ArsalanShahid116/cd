# cd: Towards Eleveting Programming Productivity

## skelton oproject setup for cd

git setup 
=========

$ sudo apt-get install git 
$ git config --global user.name "AIProjectZero"
$ git config --global user.email aiprojectzo@gmail.com

clone cd project
================

$ git clone https://github.com/AIProjectZero/cd.git
$ cd cd/

create a virtualenv using Pipenv 
================================

Prerequisites 
-------------
1) pip
2) pipenv 
3) python 

$ pipenv shell

Setting up a django as backend
==============================

$ pipenv install django
$ django-admin startproject backend

start a new editor app
----------------------

$ cd backend
$ python manage.py startapp cdEditor
$ python manage.py migrate
$ python manage.py runserver

At this time in point, check if initial instance of Django is running at following address: http://127.0.0.1:8000

register cdEditor app
---------------------

$ vi backend/settings.py

    # Application definition
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'cdEditor' # add this 
      ]

Setting up react as frontend
============================

$ sudo npm install -g create-react-app
$ create-react-app frontend
$ cd frontend

check if react is working
-------------------------

$ npm start





