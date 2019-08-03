import {Component, OnInit, ViewChild} from '@angular/core';
import { Table } from 'primeng/table';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {TripsService} from '../services/trips.service';

@Component({
  selector: 'app-mytrips',
  templateUrl: './mytrips.component.html',
  styleUrls: ['./mytrips.component.scss'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers

})
export class MytripsComponent implements OnInit {
  userName;
  cols: any[];
  myTrips: any[];
  EditedTripArr: {};
  dateFilters: any;
  TimeFilters: any;
  EditTrip: boolean;
  DeleteTrip: boolean;
  ShowMore: boolean;
  RateDriverModal: boolean;
  CancelReserve: boolean;
  rowid: any;
  DriverName;
  VehicleType;
  ProductionYear;
  NofSeats;
  CarPlate;
  Comments;
  ErrorMessage;
  DriverNameForRating = '';
  Frominput;
  Toinput;
  Dateinput;
  Timeinput;
  Ownerinput;
  avalibaleSeatsinput;
  DriverNameinput;
  VehicleTypeinput;
  ProductionYearinput;
  NofSeatsinput;
  CarPlateinput;
  Commentinput = ''
  registerForm: FormGroup;
  submitted = false;
  data: any[];
  DataFromBack: any[]; UserId; OwnerName ; OwnerGender ; Time;
  ReservedTrips:  any[];
  ReservedDataFromBack: any;
  constructor(private formBuilder: FormBuilder, config: NgbRatingConfig, private tripService: TripsService ) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    this.DataFromBack = [];

  }

  @ViewChild('myTable') private _table: Table;


  ngOnInit() {

    this.tripService.listMyTrips().subscribe(
        data => {
          this.DataFromBack.push(data);
          this.DataFromBack = this.DataFromBack[0];
          let test: any [];
          test = [];
         const array = JSON.parse(localStorage.getItem('User'));
          this.UserId = array['id'];
          for (let i = 0; i < this.DataFromBack.length; i++) {
            if (this.DataFromBack[i]['vehicle']['user']['id'] === this.UserId) {
              this.OwnerName = this.DataFromBack[i]['vehicle']['user']['username'];
              this.OwnerGender = this.DataFromBack[i]['vehicle']['user']['gender'];
              this.DriverName = this.DataFromBack[i]['vehicle']['driver_name'];
              this.VehicleType = this.DataFromBack[i]['vehicle']['type'];
              this.CarPlate = this.DataFromBack[i]['vehicle']['car_plate'];
              this.ProductionYear = this.DataFromBack[i]['vehicle']['production_year'];
              this.NofSeats = this.DataFromBack[i]['vehicle']['seats'];
              this.Time = this.timeValidation(this.DataFromBack[i]['Time']);
              test.push({'id': this.DataFromBack[i]['id'], 'time':
                this.Time, 'type': this.VehicleType, 'car_plate': this.CarPlate,
                'driver_name': this.DriverName, 'production_year': this.ProductionYear, 'seats': this.NofSeats,
                'user': this.OwnerName, 'user_gender': this.OwnerGender,
                'available_seats': this.DataFromBack[i]['available_seats'], 'comments': this.DataFromBack[i]['comments']
                , 'start_from': this.DataFromBack[i]['start_from'] , 'date': this.DataFromBack[i]['date'],
                'to': this.DataFromBack[i]['to'], 'status': this.DataFromBack[i]['status']});
            }
            this.myTrips = test;
          }

        },
        err => console.error(err),
        () => console.log('done loading posts')
    );


    this.tripService.listMyReservedTrip().subscribe(
        data => {
          this.ReservedDataFromBack = data;
          let test: any [];
          test = [];
          const array = JSON.parse(localStorage.getItem('User'));
          this.UserId = array['id'];
          for (let i = 0; i < this.ReservedDataFromBack.length; i++) {
            if (this.ReservedDataFromBack[i]['traveler']['id'] === this.UserId) {
              console.log(this.ReservedDataFromBack[i]['trip'])
              test.push({'id': this.ReservedDataFromBack[i]['trip']['id'],
                'time': this.timeValidation(this.ReservedDataFromBack[i]['trip']['Time']),
                'type': this.ReservedDataFromBack[i]['trip']['vehicle']['type'],
                'car_plate': this.ReservedDataFromBack[i]['trip']['vehicle']['car_plate'],
                'driver_name': this.ReservedDataFromBack[i]['trip']['vehicle']['driver_name'],
                'production_year': this.ReservedDataFromBack[i]['trip']['vehicle']['production_year'],
                'seats': this.ReservedDataFromBack[i]['trip']['vehicle']['seats'],
                'user' : this.ReservedDataFromBack[i]['trip']['vehicle']['user']['username'],
                'available_seats': this.ReservedDataFromBack[i]['trip']['available_seats'],
                'comments': this.ReservedDataFromBack[i]['trip']['comments'],
                'start_from': this.ReservedDataFromBack[i]['trip']['start_from'],
                'date': this.ReservedDataFromBack[i]['trip']['date'],
                'to': this.ReservedDataFromBack[i]['trip']['to'],
                'status': this.ReservedDataFromBack[i]['trip']['status']});

              // test.push(this.ReservedDataFromBack[i]);
            }
          }
          this.ReservedTrips = test;
          console.log(this.ReservedTrips)
        },
        err => console.error(err),
        () => console.log('done loading posts')
    );


    this.registerForm = this.formBuilder.group({
      start_from : ['', Validators.required],
      to : ['', Validators.required],
      date : ['', Validators.required],
      time : ['', Validators.required],
      AvSeats : ['', Validators.required],
      Comments : ['', Validators.required],
      DriverName : ['', Validators.required],
      VehicleType : ['', Validators.required],
      ProdYear : ['', Validators.required],
      CarPlate: ['', Validators.required],
      NofSeats: ['', Validators.required],
      SelectedVehicle: [''],
    });

    this._table.filterConstraints['my'] = (value, filter): boolean => {
      return value === filter;
    };


    this.cols = [
      {field: 'start_from', header: 'From'},
      {field: 'to', header: 'To'},
      {field: 'date', header: 'Date'},
      {field: 'time', header: 'Time'},
      {field: 'user', header: 'Owner'},
      {field: 'status', header: 'Status'},
      {field: 'Action', header: 'Action'}
    ];
  }

  get f() {
    return this.registerForm.controls;
  }

  filter($event, field) {

    let mnth = ('0' + ($event.getMonth() + 1)).slice(-2);
    let day = ('0' + $event.getDate()).slice(-2);
    let targerDate = [$event.getFullYear(), mnth, day].join('-');
    this._table.filter(targerDate, field, 'contains');
  }

  TimeFilter($event, field) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    let timeValue = `${hour}:${min}`;
    this._table.filter(timeValue, field, 'contains');
  }

  timeValidation(strTime) {
    return strTime.replace(/:\d\d([ ap]|$)/, '$1');
  }

  clearfilter() {
    this.dateFilters = '';
    this.TimeFilters = '';
    this._table.reset();
  }

  MoreDetails(rowData) {
    this.ShowMore = !this.ShowMore;
    this.DriverName = rowData['driver_name'];
    this.VehicleType = rowData['type'];
    this.CarPlate = rowData['car_plate'];
    this.ProductionYear = rowData['production_year'];
    this.NofSeats = rowData['seats'];
    this.Comments = rowData['comments'];
  }



  Edit(index, rowdata) {
    this.EditTrip = !this.EditTrip;
    this.rowid = index;
    this.Frominput = rowdata['start_from'];
    this.Toinput = rowdata['to'];
    this.Dateinput = rowdata['date'];
    this.Timeinput = rowdata['time'];
    this.avalibaleSeatsinput = rowdata['available_seats'];
    this.Commentinput = rowdata['comments'];
    this.DriverNameinput = rowdata['driver_name'];
    this.VehicleTypeinput = rowdata['type'];
    this.CarPlateinput = rowdata['car_plate'];
    this.ProductionYearinput = rowdata['production_year'];
    this.NofSeatsinput = rowdata['seats'];
    this.data = rowdata;

  }


  EditTripDialog(rowid) {
    this.ErrorMessage = '';
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let ConvertedDate;
    let CovertedTime;

    if (this.Dateinput !== this.data['Date'] && this.Timeinput !== this.data['Time']) {
      ConvertedDate = this.ConvertDate(this.Dateinput);
      CovertedTime = this.ConvertTime(this.Timeinput);
    }
    if (this.Dateinput === this.data['Date'] && this.Timeinput !== this.data['Time']) {
      ConvertedDate =  this.Dateinput;
      CovertedTime = this.ConvertTime(this.Timeinput);

    }

    if (this.Dateinput !== this.data['Date'] && this.Timeinput === this.data['Time']) {
      ConvertedDate = this.ConvertDate(this.Dateinput);
      CovertedTime = this.Timeinput;

    }
    if (this.Dateinput === this.data['Date'] && this.Timeinput === this.data['Time']) {
      ConvertedDate = this.Dateinput;
      CovertedTime = this.Timeinput;

    }
    if (this.avalibaleSeatsinput > this.NofSeatsinput) {
      this.ErrorMessage = 'Seats number Should be greater than Available seats number';
      return;
    }
      this.EditedTripArr = {
      From: this.Frominput, To: this.Toinput, Date: ConvertedDate,
      Time: CovertedTime, Owner: 'Abdallah', Status: 'Completed', Seats: this.avalibaleSeatsinput,
      DriverName: this.DriverNameinput, VehicleType: this.VehicleTypeinput,
      ProductionYear: this.ProductionYearinput, NofSeats: this.NofSeatsinput,
      CarPlate: this.CarPlateinput, Comments: this.Commentinput
    };


    this.myTrips[rowid] = this.EditedTripArr;
    this.EditTrip = false;
  }

  ConvertDate(Date) {
    let mnth = ('0' + (Date.getMonth() + 1)).slice(-2);
    let day  = ('0' + Date.getDate()).slice(-2);
    let targerDate = [ Date.getFullYear(), mnth, day ].join('-');
    return targerDate;
  }

  ConvertTime(Time) {
    let hour = new Date(Time).getHours();
    let min = new Date(Time).getMinutes();
    let timeValue = `${hour}:${min}`;
    return timeValue;
  }

    RateDriver(rowdata) {
      this.RateDriverModal = !this.RateDriverModal;
      this.DriverNameForRating = rowdata['DriverName'];
    }

  ConfrimRateDriver(currentRate) {
    this.RateDriverModal = false;
  }
  CancelReservation() {
    this.CancelReserve = !this.CancelReserve;
  }
  ConfirmCancelReservation(rowid) {
    this.CancelReserve = false;

  }
}
