import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName; array;
  constructor(private router: Router) { }

  ngOnInit() {
    this.array = JSON.parse(localStorage.getItem('User'));
    this.userName = this.array['email'];
  }
}
