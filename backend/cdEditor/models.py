# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here
class program(models.Model):
    language = models.CharField(max_length=30)
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=120)
    code = models.TextField()
    commandLineArgs = models.TextField(blank="true") 
    output = models.TextField(blank="true")

    def _str_(self):
        return self.title

