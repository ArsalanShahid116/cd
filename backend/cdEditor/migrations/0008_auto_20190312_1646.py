# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-12 16:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cdEditor', '0007_program_output'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='output',
            field=models.TextField(default=''),
        ),
    ]
