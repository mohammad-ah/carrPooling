import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Table } from 'primeng/table';
import {Dropdown} from 'primeng/dropdown';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {TripsService} from '../services/trips.service';


@Component({
    selector: 'app-all-trips',
    templateUrl: './all-trips.component.html',
    styleUrls: ['./all-trips.component.scss'],
    encapsulation : ViewEncapsulation.None

})
export class AllTripsComponent implements OnInit {
    @ViewChild('myTable') private _table: Table;
    @ViewChild('myDropDown') private _DropDown: Dropdown;

    cols: any[];
    trips: any[];
    LadiesTrips: any[];
    AddNewTripArray: {};
    dateFilters: any;
    vehicles;
    TimeFilters: any;
    display: boolean;
    displayVehicle: boolean;
    ShowMore: boolean;
    rowData: any;
    AddNew: boolean;
    OwnerName; OwnerGender;
    DriverName; VehicleType; ProductionYear; NofSeats; CarPlate; Comment; Time ;
    Frominput; Toinput; Dateinput; Timeinput; Ownerinput; avalibaleSeatsinput; Commentinput = '';
    ErrorMessage;
    registerForm: FormGroup;
    addNewVehicleForm: FormGroup;
    submitted = false;
    submittedVehicle = false;
    status: boolean;
    DataFromBack: any[];
    AvaliableSearsFormBack;
    SelectedVehicle; username; email; phone; gender; id;
    tripId;

    constructor(private formBuilder: FormBuilder, private tripService: TripsService ) {
        this.vehicles = [];
        this.DataFromBack = [];

        this.tripService.getVehicle().subscribe(
            data => {
                for (let j = 0; j < data['vehicle'].length; j++) {
                    this.vehicles.push({label: data['vehicle'][j]['type'], value: data['vehicle'][j]['id'] });
                }
            },
            err => console.error(err),
            () => console.log('done loading posts')
        );

    }

    ngOnInit() {
        this.ErrorMessage = '';
        this.tripService.list().subscribe(
            data => {
                this.DataFromBack.push(data);
                this.DataFromBack = this.DataFromBack[0];
                let test: any [];
                test = [];

                for (let i = 0; i < this.DataFromBack.length; i++) {
                    if (this.DataFromBack[i]['available_seats'] !== 0 ) {
                    this.OwnerName = this.DataFromBack[i]['vehicle']['user']['username'];
                    this.OwnerGender = this.DataFromBack[i]['vehicle']['user']['gender'];
                    this.DriverName = this.DataFromBack[i]['vehicle']['driver_name'];
                    this.VehicleType = this.DataFromBack[i]['vehicle']['type'];
                    this.CarPlate = this.DataFromBack[i]['vehicle']['car_plate'];
                    this.ProductionYear = this.DataFromBack[i]['vehicle']['production_year'];
                    this.NofSeats = this.DataFromBack[i]['vehicle']['seats'];
                    this.Time = this.timeValidation(this.DataFromBack[i]['Time']);
                    test.push({'id': this.DataFromBack[i]['id'], 'Time':
                     this.Time, 'vehicle_Type': this.VehicleType, 'car_plate': this.CarPlate,
                    'DriverName': this.DriverName, 'ProductionYear': this.ProductionYear, 'NofSeats': this.NofSeats,
                        'user': this.OwnerName, 'user_gender': this.OwnerGender,
                    'available_seats': this.DataFromBack[i]['available_seats'], 'comments': this.DataFromBack[i]['comments']
                        , 'start_from': this.DataFromBack[i]['start_from'] , 'date': this.DataFromBack[i]['date'],
                        'to': this.DataFromBack[i]['to']});

                }
                 this.trips = test;
              }



            },
            err => console.error(err),
            () => console.log('done loading posts')
        );

        if (this.status = false) {
            this._table.filterConstraints['my'] = (value, filter): boolean => {
                return value === filter;
            };
        }

        this.registerForm = this.formBuilder.group({
            From : ['', Validators.required],
            To : ['', Validators.required],
            date : ['', Validators.required],
            Time : ['', Validators.required],
            AvSeats : ['', Validators.required],
            Comments : ['', Validators.required],
            SelectedVehicle: [''],
        });

        this.addNewVehicleForm = this.formBuilder.group({
            driver_name : ['', Validators.required],
            type : ['', Validators.required],
            production_year : ['', Validators.required],
            car_plate : ['', Validators.required],
            seats : ['', Validators.required],
        });

        this.cols = [
            {field: 'start_from', header: 'From'},
            {field: 'to', header: 'To'},
            {field: 'date', header: 'Date'},
            {field: 'Time', header: 'Time'},
            {field: 'user', header: 'Owner'},
            {field: 'available_seats', header: 'Available Seats'},
            {field: 'Action', header: 'Action'},
        ];
    }

    filter($event, field) {
        const mnth = ('0' + ($event.getMonth() + 1)).slice(-2);
        const day = ('0' + $event.getDate()).slice(-2);
        const targerDate = [$event.getFullYear(), mnth, day].join('-');
        this._table.filter(targerDate, field, 'contains');
    }
    TimeFilter($event, field) {
        const hour = new Date($event).getHours();
        const min = new Date($event).getMinutes();
        const timeValue = `${hour}:${min}`;
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

    ShowVehicleInfo(rowData) {
        this.ShowMore = !this.ShowMore;
        this.DriverName = rowData['DriverName'];
        this.VehicleType = rowData['vehicle_Type'];
        this.CarPlate = rowData['car_plate'];
        this.ProductionYear = rowData['ProductionYear'];
        this.NofSeats = rowData['NofSeats'];
        this.Comment = rowData['comments'];
    }

    ConvertDate(Date) {
        const mnth = ('0' + (Date.getMonth() + 1)).slice(-2);
        const day  = ('0' + Date.getDate()).slice(-2);
        const targerDate = [ Date.getFullYear(), mnth, day ].join('-');
        return targerDate;
    }

    ConvertTime(Time) {
        const hour = new Date(Time).getHours();
        const min = new Date(Time).getMinutes();
        const timeValue = `${hour}:${min}`;
        return timeValue;
    }
    get f() { return this.registerForm.controls; }
    get v() { return this.addNewVehicleForm.controls; }

    clickEvent() {
        this.status = !this.status;
        this.LadiesTrips = [];

        for (let i = 0; i < this.trips.length; i++) {
            if (this.OwnerGender === 1 ) {
                this.LadiesTrips.push(this.trips[i]);
            }
        }
    }

    ShowAddNewdialog() {
        this.AddNew = !this.AddNew;
    }
    getValue(event) {
        this.SelectedVehicle = event.value;
    }

    AddNewTrip() {
        this.ErrorMessage = '';
        this.submitted = true;
        if (this.registerForm.invalid  ) {
            return;
        }


        const ConvertedDate = this.ConvertDate(this.registerForm.value['date']);
        const CovertedTime = this.ConvertTime(this.Timeinput);
        this.registerForm.value.SelectedVehicle = this.SelectedVehicle;
        const addNewTripData = {
               'start_from': this.registerForm.value['From'],
               'to': this.registerForm.value['To'],
               'date': ConvertedDate,
               'Time': CovertedTime,
               'available_seats': this.registerForm.value['AvSeats'] ,
               'comments': this.registerForm.value['Comments'],
               'vehicle_id': this.registerForm.value.SelectedVehicle,
           };
        this.tripService.AddNewTrip(addNewTripData).subscribe(
            response => {
                this.AddNew = false;
                this.refrehTable();
                },
            error => console.log(error)
        );

    }

    addNewVehicledialog() {
        this.displayVehicle = !this.displayVehicle;
    }
    reserveDialog(rowData) {
        this.display = !this.display;
        this.tripId = rowData.id;
    }
    reserveTrip() {
        const traveler = JSON.parse(localStorage.getItem('User'));
        const UserId = traveler['id'];
        const ReservationObj = {
            'trip' : this.tripId,
            'traveler' : UserId
        }
        // this.tripService.AddReservation(ReservationObj)
        this.tripService.AddReservation(ReservationObj).subscribe(
            response => {
                this.refrehTable();
                this.display = false;
            },
            error => console.log(error)
        );

    }

    refrehTable() {
        this.trips = [];
        this.DataFromBack = [];
        this.tripService.list().subscribe(
            data => {
                this.DataFromBack.push(data);
                this.DataFromBack = this.DataFromBack[0];
                let test: any [];
                test = [];

                for (let i = 0; i < this.DataFromBack.length; i++) {
                    if (this.DataFromBack[i]['available_seats'] !== 0 ) {
                        this.OwnerName = this.DataFromBack[i]['vehicle']['user']['username'];
                        this.OwnerGender = this.DataFromBack[i]['vehicle']['user']['gender'];
                        this.DriverName = this.DataFromBack[i]['vehicle']['driver_name'];
                        this.VehicleType = this.DataFromBack[i]['vehicle']['type'];
                        this.CarPlate = this.DataFromBack[i]['vehicle']['car_plate'];
                        this.ProductionYear = this.DataFromBack[i]['vehicle']['production_year'];
                        this.NofSeats = this.DataFromBack[i]['vehicle']['seats'];
                        this.Time = this.timeValidation(this.DataFromBack[i]['Time']);
                        test.push({'id': this.DataFromBack[i]['id'], 'Time':
                            this.Time, 'vehicle_Type': this.VehicleType, 'car_plate': this.CarPlate,
                            'DriverName': this.DriverName, 'ProductionYear': this.ProductionYear, 'NofSeats': this.NofSeats,
                            'user': this.OwnerName, 'user_gender': this.OwnerGender,
                            'available_seats': this.DataFromBack[i]['available_seats'], 'comments':this.DataFromBack[i]['comments']
                            , 'start_from': this.DataFromBack[i]['start_from'] , 'date': this.DataFromBack[i]['date'],
                            'to': this.DataFromBack[i]['to']});

                    }
                    this.trips = test;
                }



            },
            err => console.error(err),
            () => console.log('done loading posts')
        );
    }
    addNewVehicle() {
        this.submittedVehicle = true;

        if (this.addNewVehicleForm.invalid  ) {
            return;
        }
        this.tripService.AddNewVehicle(this.addNewVehicleForm.value).subscribe(
            response => {
                this.vehicles.push({label: response['vehicle']['type'], value: response['vehicle']['id'] });
                this.displayVehicle = false;
            },
            error => console.log(error)
        );

    }

}


