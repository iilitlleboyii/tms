# Generated by Django 4.0.4 on 2022-05-05 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_collect_alter_user_options'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Collect',
        ),
    ]