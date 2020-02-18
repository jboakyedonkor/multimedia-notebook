FROM python:3.8-alpine

EXPOSE 8000
RUN git clone https://github.com/kwaku97/multimedia-notebook.git
WORKDIR multimedia-notebook/
RUN pip install -r requirements.txt
ENTRYPOINT[ 'python', './backend/manage.py', 'runserver' ,'0.0.0.0:8000']
