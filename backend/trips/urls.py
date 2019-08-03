# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('trips/', views.TripList.as_view(), name='trip_list'),
    path('trips/<int:pk>/', views.TripDetails.as_view(), name='trip_details'),
    path('reservation/', views.ReservationList.as_view(), name='reservation_list'),
    path('reservation/<int:pk>/', views.ReservationDetails.as_view(), name='reservation_details'),

]