# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-10 19:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cdEditor', '0005_program_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='commandLineArgs',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='program',
            name='description',
            field=models.CharField(default=1, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='program',
            name='language',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='program',
            name='title',
            field=models.CharField(max_length=70),
        ),
    ]
