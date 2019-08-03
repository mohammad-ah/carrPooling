import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('http://127.0.0.1:8000/api/trips/');
  }

  listMyTrips() {
    return this.http.get('http://127.0.0.1:8000/api/myTrips/');
  }
  listMyReservedTrip() {
    return this.http.get('http://127.0.0.1:8000/api/reservation/');

  }

  AddNewTrip(data) {
    return this.http.post('http://127.0.0.1:8000/api/trips/', data);
  }

  getVehicle() {
      // console.log(this.http.get('http://127.0.0.1:8000/api/vehicle/'));
    return this.http.get('http://127.0.0.1:8000/api/vehicle/');

  }
  AddNewVehicle(data) {
    return this.http.post('http://127.0.0.1:8000/api/vehicle/', data);
  }
  AddReservation(data) {
    return this.http.post('http://127.0.0.1:8000/api/reservation/', data);

  }

}
