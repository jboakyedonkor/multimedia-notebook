from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from datetime import datetime, timezone

# Create your views here.


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def create_new_user(request):
    try:
        body = request.data
        user_body = body.copy()
        body.pop('language')
        user_body.pop("password")
        user_body.pop("username")
        
        user = User.objects.create_user(body['username'],body['email'],body['password'],first_name=body['first_name'],last_name=body['last_name'])
        user_profile = UserProfile(user=user,**user_body)
        user_profile.save()
        token, created = Token.objects.get_or_create(user=user)
        message = {"auth_token": "Token " + token.key}

        send_mail("Account created for Multimedia",
                  "Welcome to Multimedia notebook",
                  'from@example.com',
                  [user.email],
                  fail_silently=False)

        return Response(
            message,
            status=status.HTTP_201_CREATED,
            content_type='application/json')
    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request):
    try:
        body = request.data
        user_body = body.copy()
        keys = set(body.keys())

        if not keys.issubset({'email', 'first_name', 'last_name', 'language'}):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if 'language' in user_body.keys():
            del user_body['language']

        request.user.update(**user_body)
        request.user.save()

        user_profile = UserProfile.filter(user=request.user).update(**body)

        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_password(request):

    body = request.data
    keys = set(body.keys())

    if not keys.issubset({'old_password', 'new_password'}):
        return Response(
            {
                'error': 'missing required parameters:[old_password, new_password]'},
            status=status.HTTP_400_BAD_REQUEST)
    try:
        if request.user.check_password(body['old_password']):
            request.user.set_password(body['new_password'])
            request.user.save()
            new_token, created = Token.objects.get_or_create(user=request.user)
            message = {"auth_token": "Token " + new_token.key}
            return Response(
                message,
                status=status.HTTP_200_OK,
                content_type='application/json')
        else:
            return Response({'error': 'incorrect password'},
                            status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
