import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drating',
  templateUrl: './drating.component.html',
  styleUrls: ['./drating.component.scss']
})
export class DratingComponent implements OnInit {

  ratings;
  cols;

  constructor() { }

  ngOnInit() {
    this.cols = [
      {field: 'Driver', header: 'Driver'},
      {field: 'Vehicle', header: 'Vehicle'},
      {field: 'Rate', header: 'Rate'}
    ];

    this.ratings = [
      {
        Driver: 'Abood', Vehicle: 'Nisan XXX', Rate: 4
      },
      {
        Driver: 'Mahmood', Vehicle: 'Seyat XXX', Rate: 2
      },
      {
        Driver: 'Ali', Vehicle: 'Nisan XXX', Rate: 1
      },
      {
        Driver: 'Ahmad', Vehicle: 'Nisan XXX', Rate: 5
      },
      {
        Driver: 'Sondos', Vehicle: 'Nisan XXX', Rate: 3
      },
      {
        Driver: 'Moh', Vehicle: 'Nisan XXX', Rate: 2
      },
      {
        Driver: 'Somaya', Vehicle: 'Nisan XXX', Rate: 4
      }
    ];

  }

}
