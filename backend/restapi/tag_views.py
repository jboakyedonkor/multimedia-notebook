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
from .models import Note, Tag, UserProfile
from .serializers import NoteSerializer, TagSerializer, UserProfileSerializer
from datetime import datetime, timezone


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_tag(request):
    body = request.data
    try:
        tag, created = Tag.objects.get_or_create(
            name=body['name'], user=request.user)
        if created:
            tag.accessed_at = tag.created_at
            tag.save()
            serializer = TagSerializer(tag)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            message = {"message": "tag already exists"}
            return Response(message, status=status.HTTP_200_OK)

    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_tag(request):
    body = request.data
    try:
        current_tag = Tag.objects.get(
            name=body['current_name'], user=request.user)
        current_tag.name = body['new_name']
        current_tag.save()
        serializer = TagSerializer(current_tag)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
            content_type='application/json')

    except Tag.DoesNotExist:
        message = {"error": "tag not found"}
        return Response(
            message,
            status=status.HTTP_204_NO_CONTENT,
            content_type='application/json')


@api_view(['DELETE'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_tag(request):
    body = request.data
    try:
        current_tag = Tag.objects.get(name=body['name'], user=request.user)
        current_tag.delete()

        message = {'message': 'tag deleted'}
        return Response(
            message,
            status=status.HTTP_200_OK,
            content_type='application/json')

    except current_tag.DoesNotExist:

        message = {"message": "tag not found"}
        return Response(
            message,
            status=status.HTTP_204_NO_CONTENT,
            content_type='application/json')


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_tag(request):
    body = request.data
    keys = set(body.keys())
    
    if 'date' in keys:
        oldest_time = datetime.strptime(body['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        current_tag = Tag.objects.filter(accessed_at__lte=oldest_time, user=request.user).order_by('-accessed_at')
       
        response_data = TagSerializer(current_tag, many=True).data
        current_tag.update(accessed_at=datetime.now(timezone.utc))
    elif 'name' in keys:
        current_tag = Tag.objects.filter(name=body['name'], user=request.user)
        if not current_tag.exists():     
            message = {"error": "tag not found"}
            return Response(
                message,
                status=status.HTTP_204_NO_CONTENT,
                content_type='application/json')

        current_tag.update(accessed_at=datetime.now(timezone.utc))        
        tag_data = TagSerializer(current_tag[0]).data
        response_data = tag_data.copy()
        notes_data = NoteSerializer(current_tag[0].notes.all(),many=True).data
        response_data['notes']=notes_data
    else:
        return Response({"error":"'name' parameter missing"}, status=status.HTTP_400_BAD_REQUEST,content_type='application/json')

    return Response(response_data,status=status.HTTP_200_OK,content_type='application/json')

  
