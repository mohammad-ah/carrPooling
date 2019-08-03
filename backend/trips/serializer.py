from rest_framework import serializers
from accounts.serializer import UserSerializer, VehicleSerializer
from .models import Trip, Reservation


class TripSerializer(serializers.ModelSerializer):
	vehicle = VehicleSerializer(many=False)
	available_seats = serializers.SerializerMethodField("seats_available_to_book")

	def seats_available_to_book(self, trip):
		reservation_num = Reservation.objects.filter(trip=trip).count()
		return trip.available_seats - reservation_num


	class Meta:
		model = Trip
		fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
	traveler = UserSerializer(many=False)
	trip = TripSerializer(many=False)

	class Meta:
		model = Reservation
		fields = ('trip', 'traveler')


