from . import views
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns =[
    path('api-token-auth/',obtain_auth_token),
    path('create-user',views.create_new_user,name='create_user'),
    path('create-note',views.create_note,name='create_note'),
    path('',views.get_note,name='get_note'),
]
