from rest_framework import generics, status
from .models import Trip, Reservation
from .serializer import TripSerializer, ReservationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import IntegrityError


class TripList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Trip.objects.filter(status=1)
    serializer_class = TripSerializer

    def post(self, request, *args, **kwargs):
        trip = Trip(**request.data)
        trip.save()
        return Response({'trip': TripSerializer(trip).data}, status=status.HTTP_200_OK)


class MyTripList(generics.ListAPIView):
	permission_classes = (IsAuthenticated,)
	queryset = Trip.objects.all()
	serializer_class = TripSerializer


#     serializer_class = TripSerializerclass MyTripList(generics.ListAPIView):
#     permission_classes = (IsAuthenticated, )
#     queryset = Trip.objects.filter()
#     serializer_class = TripSerializer


class TripDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class ReservationList(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            reservations = Reservation(traveler_id=data['traveler'], trip_id=data['trip'])
            reservations.save()
        except IntegrityError:
            return Response("No more seats available", status=status.HTTP_400_BAD_REQUEST)

        return Response(ReservationSerializer(reservations).data, status=status.HTTP_200_OK)


class ReservationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

