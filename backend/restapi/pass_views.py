from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib.auth.models import Group, User
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes ,renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_password(request):

    body = request.data
    keys = set(body.keys())

    if  not {'old_password', 'new_password'}.issubset(keys):
        return Response({'error':'missing required parameters:[old_password, new_password]'},status=status.HTTP_400_BAD_REQUEST)
    try:
        if request.user.check_password(body['old_password']):
            request.user.set_password(body['new_password'])
            request.user.save()
            new_token = Token.objects.get_or_create(user=request.user)
            message = {"auth_token": "Token " + new_token.key}
            return Response( message, status= status.HTTP_200_OK ,content_type='application/json')
        else:
            return Response({'error':'incorrect password'},status=status.HTTP_400_BAD_REQUEST)
            
    except KeyError:
        return Response({'error':'missing required parameters:[old_password, new_password]'},status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)