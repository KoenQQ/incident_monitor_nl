web: python backend/manage.py collectstatic --no-input; gunicorn --pythonpath backend incident_webscraper.wsgi --log-file - --log-level debug
release: python backend/manage.py migrate

