# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here
class program(models.Model):
    owner = models.ForeignKey(User, related_name="programs",
                        on_delete=models.CASCADE, null=True)
    language = models.CharField(max_length=30)
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=120)
    code = models.TextField()
    commandLineArgs = models.TextField(blank="true") 
    output = models.TextField(blank="true")

    def _str_(self):
        return self.title

