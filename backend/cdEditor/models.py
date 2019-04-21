# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django import forms
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

class program(models.Model):
    owner = models.ForeignKey(User, related_name="programs",
                        on_delete=models.CASCADE, null=True)
    language = models.CharField(max_length=30)
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=120)
    code = models.TextField()
    commandLineArgs = models.TextField(blank="true") 
    output = models.TextField(blank="true")

    def save(self, *args, **kwargs):
        programLanguage = self.language
        if (programLanguage == "python"):
            ext = ".py"
        elif (programLanguage == "sh"):
            ext = ".sh"
        elif (programLanguage == "c_cpp"):
            ext = ".c"
        programCode = ContentFile(self.code)
        programOwner = self.owner
        programTitle =  self.title

        path = "UserPrograms/%s/%s%s"% (programOwner, programTitle, ext)
        default_storage.save(path, programCode)

    def _str_(self):
        return self.title


