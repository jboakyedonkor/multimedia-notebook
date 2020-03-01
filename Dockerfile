FROM python:3.8-alpine

EXPOSE 8000
COPY backend/ backend/
COPY requirements.txt backend/requirements.txt
WORKDIR backend/
RUN pip install -r requirements.txt && python manage.py collectstatic && \
python manage.py migrate 
ENTRYPOINT [ "gunicorn","-b","0.0.0.0:8000","backend.wsgi"]