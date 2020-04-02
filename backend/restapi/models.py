from django.db import models
from django.contrib.auth.models import User, Group
from datetime import datetime, timezone
# Create your models here.

class Note(models.Model):

    name = models.CharField(max_length=70, unique=True)
    text = models.TextField()
    video_link = models.TextField(null=True)
    audio_link = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    accessed_at = models.DateTimeField(null=True,blank=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=15, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.ManyToManyField(Note)    
    accessed_at = models.DateTimeField(null=True,blank=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(unique=True,blank=True)
    first_name = models.CharField(max_length=15,blank=True)
    last_name = models.CharField(max_length=15, blank=True)
    language = models.CharField(max_length=15,blank=True)
    
    def __str__(self):
        return self.first_name+" "+self.last_name