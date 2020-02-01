from . import views
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns =[
    path('api-token-auth/',obtain_auth_token),
    path('create_user',views.create_new_user,name='create_user'),
    path('',views.get_note,name='get_note'),
]
