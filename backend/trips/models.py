from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from accounts.models import User, Vehicle
from django.utils.translation import gettext as _
import datetime


class Trip(models.Model):
	Open = 1
	Booked = 2
	Completed = 3
	Canceled = 4

	Status_CHOICES = (
		(Open, 'Open'),
		(Booked, 'Booked'),
		(Completed, 'Completed'),
		(Canceled, 'Canceled'),
	)
	start_from = models.CharField(_('From'), max_length=30, null=False)
	to = models.CharField(_('To'), max_length=30, null=False)
	date = models.DateField(_('Date of Trip'), default=datetime.date.today)
	Time = models.TimeField(_('Time of Trip'), blank=True, null=True)
	status = models.IntegerField(_('Status'), choices=Status_CHOICES, default=1)
	available_seats = models.IntegerField(_('Available Seats'), default=1, validators=[MaxValueValidator(100), MinValueValidator(0)])
	comments = models.CharField(_('Comment'), max_length=30, null=True)
	vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, default=False)


class Reservation (models.Model):

	trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
	traveler = models.ForeignKey(User, on_delete=models.CASCADE)

	class Meta:
		unique_together = [['traveler', 'trip']]


