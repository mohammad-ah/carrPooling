import {Component, OnInit, ViewChild} from '@angular/core';
import { Table } from 'primeng/table';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


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
  currentRate;
  constructor(private formBuilder: FormBuilder, config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;
  }

  @ViewChild('myTable') private _table: Table;


  ngOnInit() {
    this.currentRate = 4;

    this.registerForm = this.formBuilder.group({
      From: ['', Validators.required],
      To: ['', Validators.required],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      AvSeats: ['', Validators.required],
      Comments: ['', Validators.required],
      DriverName: ['', Validators.required],
      VehicleType: ['', Validators.required],
      ProdYear: ['', Validators.required],
      CarPlate: ['', Validators.required],
      NofSeats: ['', Validators.required],
    });

    this._table.filterConstraints['my'] = (value, filter): boolean => {
      return value === filter;
    };
    this.myTrips = [
      {
        From: 'Ramallah', To: 'Nablus', Date: '2019-06-16', Time: '5:50', Owner: 'Mohammmad', Seats: '3',
        DriverName: 'Mohammmad', VehicleType: 'BMW', ProductionYear: '2008', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Booked'
      },
      {
        From: 'Nablus', To: 'Ramallah', Date: '2019-06-01', Time: '13:03', Owner: 'Abdallah', Seats: '2',
        DriverName: 'Abdallah', VehicleType: 'BMW', ProductionYear: '2007', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Completed'
      },
      {
        From: 'Bethlehem', To: 'Ramallah', Date: '2019-06-21', Time: '11:30', Owner: 'Abdallah', Seats: '4',
        DriverName: 'Yousef', VehicleType: 'Audi', ProductionYear: '2015', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Open'
      },
      {
        From: 'Ramallah', To: 'Bethlehem', Date: '2019-06-18', Time: '5:20', Owner: 'Sanaa', Seats: '1',
        DriverName: 'Sammer', VehicleType: 'Audi', ProductionYear: '2013', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Completed'
      },
      {
        From: 'Nablus', To: 'Bethlehem', Date: '2019-06-30', Time: '5:10', Owner: 'Abdallah', Seats: '2',
        DriverName: 'Mohammmad', VehicleType: 'BMW', ProductionYear: '2009', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Canceled'
      },
      {
        From: 'Ramallah', To: 'Rawabi', Date: '2019-06-20', Time: '3:50', Owner: 'Abdallah', Seats: '3',
        DriverName: 'Abdallah', VehicleType: 'Audi', ProductionYear: '2010', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Completed'
      },
      {
        From: 'Ramallah', To: 'Rawabi', Date: '2019-06-20', Time: '3:50', Owner: 'Mohammad', Seats: '3',
        DriverName: 'Abdallah', VehicleType: 'Audi', ProductionYear: '2010', NofSeats: '4',
        CarPlate: '662521111', Comments: 'fasfsafsafasfsfa', status: 'Open'
      }
    ];

    this.cols = [
      {field: 'From', header: 'From'},
      {field: 'To', header: 'To'},
      {field: 'Date', header: 'Date'},
      {field: 'Time', header: 'Time'},
      {field: 'Owner', header: 'Owner'},
      {field: 'Status', header: 'Status'},
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

  clearfilter() {
    this.dateFilters = '';
    this.TimeFilters = '';
    this._table.reset();
  }

  MoreDetails(rowData) {
    this.ShowMore = !this.ShowMore;
    this.DriverName = rowData['DriverName'];
    this.VehicleType = rowData['VehicleType'];
    this.CarPlate = rowData['CarPlate'];
    this.ProductionYear = rowData['ProductionYear'];
    this.NofSeats = rowData['NofSeats'];
    this.Comments = rowData['Comments'];
  }

  Delete(index) {
    this.DeleteTrip = !this.DeleteTrip;
    this.rowid = index;
  }

  ConfirmDeleteTrip(rowid) {
    this.myTrips = this.myTrips.slice(0, rowid).concat(this.myTrips.slice(rowid + 1));
    this.DeleteTrip = false;
  }

  Edit(index, rowdata) {
    this.EditTrip = !this.EditTrip;
    this.rowid = index;
    this.Frominput = rowdata['From'];
    this.Toinput = rowdata['To'];
    this.Dateinput = rowdata['Date'];
    this.Timeinput = rowdata['Time'];
    this.avalibaleSeatsinput = rowdata['NofSeats'];
    this.Commentinput = rowdata['Comments'];
    this.DriverNameinput = rowdata['DriverName'];
    this.VehicleTypeinput = rowdata['VehicleType'];
    this.CarPlateinput = rowdata['CarPlate'];
    this.ProductionYearinput = rowdata['ProductionYear'];
    this.NofSeatsinput = rowdata['NofSeats'];
    this.Commentinput = rowdata['Comments'];
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
    console.log(currentRate)
    this.RateDriverModal = false;

  }
  CancelReservation() {
    this.CancelReserve = !this.CancelReserve;
  }
  ConfirmCancelReservation(rowid) {

    this.CancelReserve = false;

  }
}
