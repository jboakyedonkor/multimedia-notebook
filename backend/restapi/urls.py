from . import views
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns =[
    
    path('api-token-auth/',obtain_auth_token),
    path('create-user',views.create_new_user,name='create_user'),
    path('create-note',views.create_note,name='create_note'),
    path('delete-note',views.delete_note,name='delete_note'),
    path('update-note',views.update_note, name='update_note'),
    path('get-note',views.get_note,name='get_note'),
    
    path('create-tag',views.create_tag,name='create_tag'),
    path('delete-tag',views.delete_tag,name='delete_tag'),
    path('update-tag',views.update_tag, name='update_tag'),
    path('get-tag',views.get_tag,name='get_tag')
]