from .models import Tag, Note
from rest_framework import serializers

class NoteSerializer( serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['name','text','video_link','audio_link','created_at']

