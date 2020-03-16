from django.db import models

# Create your models here.
class EmpDetails(models.Model):

    firstname=models.CharField(max_length=256)
    lastname=models.CharField(max_length=256)

    class Meta:
        db_table = "EmpDetails"

class Attendance(models.Model):
    id=models.AutoField(primary_key=True)
    eid = models.IntegerField()
    attendance = models.IntegerField()
    datetime = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Attendance"

class LoginCredentials(models.Model):
    id=models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=256)
    lastname = models.CharField(max_length=256)
    username = models.CharField(max_length=256)
    password = models.CharField(max_length=256)

    class Meta:
        db_table = "LoginCredentials"

class CollegeDetails(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256)
    address = models.CharField(max_length=256)
    totalCourses = models.IntegerField()
    admitCriteria=models.IntegerField()
    shortForm=models.CharField(max_length=256)
    class Meta:
        db_table = "CollegeDetails"

class Courses(models.Model):
    id = models.AutoField(primary_key=True)
    cid=models.IntegerField()
    name = models.CharField(max_length=256)
    class Meta:
        db_table = "Courses"