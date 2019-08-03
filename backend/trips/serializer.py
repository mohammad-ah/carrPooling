from rest_framework import serializers
from accounts.serializer import UserSerializer, VehicleSerializer
from .models import Trip, Reservation


class TripSerializer(serializers.ModelSerializer):
	vehicle = VehicleSerializer(many=False)
	available_seats_to_book = serializers.SerializerMethodField("calculate_available_seats")

	def calculate_available_seats(self, trip):
		print(self)

		return 5

	class Meta:
		model = Trip
		fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
	traveler = UserSerializer(many=False)
	trip = TripSerializer(many=False)

	class Meta:
		model = Reservation
		fields = ('trip', 'traveler')


