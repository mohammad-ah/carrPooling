from django.contrib import admin
from .models import Trip, Reservation

admin.site.register(Trip)
admin.site.register(Reservation)
# admin.site.register(Vehicle)