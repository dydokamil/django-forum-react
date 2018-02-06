# Django forum

This is an example application created using React and Redux to connect to a Django server that provides data.
Demo: https://django-forum-react.herokuapp.com/forums

## Quickstart

Make sure you have `virtualenv` installed.

    git clone https://github.com/dydokamil/django-forum-rest
    cd django-forum-rest
    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

## Starting npm

Make sure you have `npm` installed.

    git clone https://github.com/dydokamil/django-forum-react
    cd django-forum-react
    npm install && npm start
