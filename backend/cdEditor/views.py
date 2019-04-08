# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import programSerializer   
from .models import program                  

class programView(viewsets.ModelViewSet):    
    serializer_class = programSerializer     
    queryset = program.objects.all()         

