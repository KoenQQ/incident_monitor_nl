web: python manage.py collectstatic --no-input; gunicorn incident_webscraper.wsgi --log-file - --log-level debug
release: python manage.py migrate

