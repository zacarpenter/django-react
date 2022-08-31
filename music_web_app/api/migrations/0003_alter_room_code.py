# Generated by Django 4.1 on 2022-08-31 16:49

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_rename_vote_to_skip_room_votes_to_skip"),
    ]

    operations = [
        migrations.AlterField(
            model_name="room",
            name="code",
            field=models.CharField(
                default=api.models.generate_unique_code, max_length=8, unique=True
            ),
        ),
    ]
