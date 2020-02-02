from django.db import models
from django.contrib.auth.models import User, Group

# Create your models here.

class Note(models.Model):

    name = models.CharField(max_length=70, unique=True)
    text = models.TextField()
    video_link = models.TextField(null=True)
    audio_link = models.TextField(null=True)
    #tags = models.ManyToManyField(Tag)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=15, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.ManyToManyField(Note)

    def __str__(self):
        return self.name
