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
from .serializers import NoteSerializer
from datetime import datetime, timezone


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_note(request):
    body = request.data
    keys = set(body.keys())

    if not {'name', 'text', 'video_link', 'audio_link'}.issubset(keys):
        return Response(
            {
                'error': 'missing required parameters:[name, text, video_link, audio_link]'},
            status=status.HTTP_400_BAD_REQUEST)

    new_note, note_created = Note.objects.get_or_create(
        name=body['name'],
        text=body['text'],
        video_link=body['video_link'],
        audio_link=body['audio_link'],
        user=request.user)

    if note_created:
        new_note.accessed_at = new_note.created_at
        new_note.save()
    else:
        return Response({'message': 'note exists'}, status=status.HTTP_200_OK)

    for tag_name in body['tags']:

        tag, created = Tag.objects.get_or_create(
            name=tag_name, user=request.user)
        if created:
            tag.accessed_at = tag.created_at
        else:
            tag.accessed_at = datetime.now(timezone.utc)

        tag.notes.add(new_note)
        tag.save()

    serializer = NoteSerializer(new_note)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED,
        content_type='application/json')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_note(request):
    body = request.data
    keys = set(body.keys())

    if not keys.issubset({'name', 'date'}):
        return Response(
            {'error': 'missing required parameters:[name, date]'}, status=status.HTTP_400_BAD_REQUEST)

    note = Note.objects.filter(user=request.user)
    if 'name' in keys:
        note = note.filter(
            name__contains=body['name']).order_by('-accessed_at')

    if 'date' in keys:
        oldest_time = datetime.strptime(body['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        note = note.filter(accessed_at_lte=oldest_time).order_by('-created_at')

    if not note.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    if note.count() > 1:
        serializer = NoteSerializer(note, many=True)
    else:
        serializer = NoteSerializer(note[0])

    note.update(accessed_at=datetime.now(timezone.utc))

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_note(request):
    body = request.data
    try:
        current_note = Note.objects.get(
            name=body['name'], user=request.user)
        current_note.delete()
        message = {'message': 'note deleted'}
        return Response(
            message,
            status=status.HTTP_200_OK,
            content_type='application/json')
    except Note.DoesNotExist:
        message = {"error": "note not found"}
        return Response(
            message,
            status=status.HTTP_204_NO_CONTENT,
            content_type='application/json')


@api_view(['PUT'])
@renderer_classes([JSONRenderer])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_note(request):
    body = request.data
    try:
        current_note = Note.objects.get(
            name=body['name'], user=request.user)
        current_note.text = body['text']
        current_note.video_link = body['video_link']
        current_note.audio_link = body['audio_link']
        current_note.save()
        serializer = NoteSerializer(current_note)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
            content_type='application/json')
    except Note.DoesNotExist:
        message = {"error": "note not found"}
        return Response(
            message,
            status=status.HTTP_204_NO_CONTENT,
            content_type='application/json')
    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
