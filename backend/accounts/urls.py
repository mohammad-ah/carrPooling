# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserCreate.as_view(), name='user_list'),
    path('users/<int:pk>/', views.UserDetails.as_view(), name='user_Details'),
    path('vehicle/', views.VehicleList.as_view(), name='vehicle_list'),
    path('vehicle/<int:pk>/', views.VehicleDetails.as_view(), name='vehicle_details')
]