# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import program

# Register your models here.
class programAdmin(admin.ModelAdmin):
   list_display = ('language', 'title', 'description', 'code', 'commandLineArgs', 'output')

admin.site.register(program, programAdmin)

