from rest_framework import generics, status
from .models import Trip, Reservation
from .serializer import TripSerializer, ReservationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class TripList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def post(self, request, *args, **kwargs):
        trip = Trip(**request.data)
        print(trip)
        trip.save()
        return Response({'trip': TripSerializer(trip).data}, status=status.HTTP_200_OK)


class TripDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class ReservationList(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        reservations = Reservation(traveler_id=data['traveler'], trip_id=data['trip'])
        return Response(ReservationSerializer(reservations).data, status=status.HTTP_200_OK)


class ReservationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

