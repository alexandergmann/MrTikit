# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-19 00:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mrtikit', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='fb_token',
            field=models.CharField(default=b'none', max_length=200),
        ),
    ]
