FROM python:3.8-alpine
ARG SENDGRID_API_KEY_G

ARG DB_NAME_G
ARG DB_USER_G
ARG DB_PASSWORD_G
ARG DB_HOST_G
ARG DB_PORT_G
ARG SECRET_KEY_G 
ARG GOOG_HOST_G

ENV SENDGRID_API_KEY ${SENDGRID_API_KEY_G}
ENV DB_NAME ${DB_NAME_G}
ENV DB_USER ${DB_USER_G}
ENV DB_PASSWORD ${DB_PASSWORD_G}
ENV DB_HOST ${DB_HOST_G}
ENV DB_PORT ${DB_PORT_G}
ENV SECRET_KEY ${SECRET_KEY_G}
ENV GOOG_HOST ${GOOG_HOST_G}


ENV PORT 8080
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE ${PORT}

COPY . backend/
WORKDIR backend/

RUN  ls && apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    && rm -rf ./backend/staticfiles \
    && rm Dockerfile \
    && echo $PORT \
    && pip install --no-cache-dir -r requirements.txt 


RUN python manage.py collectstatic --settings backend.settings.deployment 
RUN python manage.py migrate --settings backend.settings.deployment


ENTRYPOINT ["gunicorn", "backend.wsgi:application", "-b" ,"0.0.0.0:8080"]