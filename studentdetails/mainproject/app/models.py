from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)
    email = models.EmailField()
    branch = models.CharField(max_length=50)
    section = models.CharField(max_length=10)

    def __str__(self):
        return self.name
