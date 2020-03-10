from .models import Tag, Note
from django.contrib.auth.models import User
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['name', 'text', 'video_link', 'audio_link', 'created_at']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['name', 'created_at']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']
