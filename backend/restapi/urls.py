from . import views ,pass_views
from django.urls import path, include
from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView

urlpatterns = [

    path('api-token-auth/', obtain_auth_token),
    path('create-user', views.create_new_user, name='create_user'),
    path('get-user', views.get_user, name='get_user'),
    path('create-note', views.create_note, name='create_note'),
    path('delete-note', views.delete_note, name='delete_note'),
    path('update-note', views.update_note, name='update_note'),
    path('get-note', views.get_note, name='get_note'),

    path('create-tag', views.create_tag, name='create_tag'),
    path('delete-tag', views.delete_tag, name='delete_tag'),
    path('update-tag', views.update_tag, name='update_tag'),
    path('get-tag', views.get_tag, name='get_tag'),
    path('update-password',pass_views.update_password,name='update-password'),
    #url(r'^password-reset/confirm/$',TemplateView.as_view(template_name="password_reset_confirm.html"),name='password-reset-confirm'),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', TemplateView.as_view(template_name="password_reset_confirm.html"), name='password_reset_confirm'),

    path('', include('rest_auth.urls') ),

]
