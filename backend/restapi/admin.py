from django.contrib import admin
from .models import Note, Tag, UserProfile

# Register your models here.
admin.site.register(Note)
admin.site.register(Tag)
admin.site.register(UserProfile)