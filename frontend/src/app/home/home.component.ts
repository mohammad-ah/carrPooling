import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeDisplay;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.displayRegistration = false;
    this.homeDisplay = 'home';
  }

}
