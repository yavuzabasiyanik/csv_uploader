from django.db import models

class Record(models.Model):
    name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    state = models.CharField(max_length=100)