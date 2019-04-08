from rest_framework import serializers
from .models import program

class programSerializer(serializers.ModelSerializer):
    class Meta:
        model = program
        fields = ('owner', 'id', 'language', 'title', 'description', 'code', 'commandLineArgs')


