# cd: Towards Eleveting Programming Productivity

## Settingup Skelton project for cd

Git setup 
=========

$ sudo apt-get install git <br/>
$ git config --global user.name "AIProjectZero" <br/>
$ git config --global user.email aiprojectzo@gmail.com <br/>

Clone cd project
================

$ git clone https://github.com/AIProjectZero/cd.git <br/>
$ cd cd/ <br/>

Create a virtualenv using Pipenv 
================================

Prerequisites 
-------------
1) pip
2) pipenv 
3) python 

$ pipenv shell <br/>

Setting up a Django as backend
==============================

$ pipenv install django <br/>
$ django-admin startproject backend <br/>

Start an editor app
----------------------

$ cd backend <br/>
$ python manage.py startapp cdEditor <br/>
$ python manage.py migrate <br/>
$ python manage.py runserver <br/>

At this time in point, check if initial instance of Django is running at following address: http://127.0.0.1:8000 <br/>

Register cdEditor app
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
        'cdEditor' 
      ]

Setting up react as frontend
============================

$ sudo npm install -g create-react-app <br/>
$ create-react-app frontend <br/>
$ cd frontend <br/>
$ npm start <br/>





