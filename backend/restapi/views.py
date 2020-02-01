from django.shortcuts import render
from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note, Tag
from .serializers import NoteSerializer

# Create your views here.

@api_view(['POST'])
def create_new_user(request):
    try:  
        body = request.data
        user = User.objects.create_user(body['username'],body['email'],body['password'],first_name=body['first_name'],last_name=body['last_name'])
        token = Token.objects.get_or_create(user=user)
        return Response(token.key,status=status.HTTP_201_CREATED)
    except Exception:
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])    
def get_note(request):
    try:
        body = request.data
        print(body['name'])
    
        note = Note.objects.get(name=body['name'])
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_note(request):
    body=request.data

    try:
        new_note = Note.objects.get(name=body['name'])
    except Note.DoesNotExist:
        new_note = None
    