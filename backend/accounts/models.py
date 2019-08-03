from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext as _
from django.contrib.auth.models import UserManager
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractBaseUser,  PermissionsMixin):
	GENDER_CHOICES = [
		(0, 'Male'),
		(1, 'Female')
	]

	username = models.CharField(_('username'), max_length=225, unique=True)
	email = models.EmailField(_('email address'), max_length=225, unique=True, blank=False)
	phone = models.CharField(_('phone'), max_length=225, null=False)
	date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
	gender = models.IntegerField(choices=GENDER_CHOICES, null=True)
	is_staff = models.BooleanField(_('staff'), default=False)
	is_superuser = models.BooleanField(_('is super user'), default=False)
	is_active = models.BooleanField(_('active'), default=True)
	objects = UserManager()
	REQUIRED_FIELDS = ['username']
	USERNAME_FIELD = 'email'


class Vehicle (models.Model):
	driver_name = models.CharField(max_length=30, null=True)
	type = models.CharField(max_length=30, null=True)
	YEAR_CHOICES = []
	for r in range(1980, (datetime.datetime.now().year + 1)):
		YEAR_CHOICES.append((r, r))
	car_plate = models.CharField(max_length=30, null=True)
	production_year = models.IntegerField(choices=YEAR_CHOICES, default=datetime.datetime.now().year)
	seats = models.IntegerField(default=4, validators=[MaxValueValidator(100), MinValueValidator(1)])
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=False)



