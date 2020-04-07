from .models import Tag, Note, UserProfile
from django.contrib.auth.models import User
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = [
            'name',
            'text',
            'favorite',
            'video_link',
            'audio_link',
            'created_at',
            'accessed_at']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = [
            'name',
            'favorite',
            'popularity',
            'created_at',
            'accessed_at']


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'email', 'language']
