# multimedia-notebook
A multimedia notebook for learning languages


## Running Django Backend
 
### Install dependencies

Dependencies are found in the backend folder

```cd backend && pip install -r requirements.txt```

### Deploy local testing 
```
$ cd backend
$ python manage.py makemigrations restapi --settings backend.settings.local
$ python manage.py migrate --settings backend.settings.local
$ python manage.py runserver --settings backend.settings.local
```
If you want to create a superuser, run this before running the ```runserver``` command. You can login into the user account at the ```http://localhost:8000/admin/```. 

## Running React Native Backend


### Install dependencies
```
$ cd frontend && npm install
$ npm install -g expo-cli
$ expo install expo-font
```

### Run React Native App

To run the application
```
$ cd  frontend
$ npm start
```