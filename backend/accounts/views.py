from rest_framework import generics, status
from .models import User, Vehicle
from .serializer import UserSerializer, VehicleSerializer, UserLoginTokenSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework import status
from rest_framework import exceptions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 'old_password', 'new_password1', 'new_password2'
    )
)


class UserCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(CustomObtainAuthToken, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = request.data
        if not data.get('password'):
            raise exceptions.ValidationError('Must include "username" and "password".')
        if not data.get('username'):
            raise exceptions.ValidationError('Must include "username" and "password".')

        # Authentication
        user = authenticate(username=data.get('username'), password=data.get('password'))

        if user:
            if not user.is_active:
                raise exceptions.ValidationError('User account is disabled.')

        else:
            raise exceptions.ValidationError('Unable to log in with provided credentials.')

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'token': UserLoginTokenSerializer(token).data
        }, status=status.HTTP_200_OK)

class VehicleList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    def list(self, request):
        user_id = request.user.id
        vehicle = Vehicle.objects.filter(user_id=user_id)
        return Response({'vehicle': VehicleSerializer(vehicle, many=True).data}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        data = request.data
        vehicle = Vehicle(user_id=user_id, **data)
        vehicle.save()
        return Response({'vehicle': VehicleSerializer(vehicle).data}, status=status.HTTP_200_OK)


class VehicleDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
