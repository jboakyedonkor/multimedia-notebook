FROM python:3.8-alpine
ARG SENDGRID_API_KEY_G

ENV SENDGRID_API_KEY ${SENDGRID_API_KEY_G}

ENV PORT 8080
EXPOSE ${PORT}
COPY . backend/
WORKDIR backend/
RUN apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    && rm -rf ./backend/staticfiles \
    && pip install --no-cache-dir -r requirements.txt 
RUN python manage.py collectstatic --settings backend.settings.deployment && \
python manage.py migrate --settings backend.settings.deployment
ENTRYPOINT [ "gunicorn","-b","localhost:8080","backend.wsgi"]
