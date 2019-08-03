import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error_message;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
   let UserData = {username: this.loginForm.value['email'], password: this.loginForm.value['password']};
    this.userService.loginUser(UserData).subscribe(
        response => {
            console.log(response);
          localStorage.setItem('Token', (response['token']['key']));
            if (localStorage.getItem('Token') != null) {
                localStorage.setItem('User', JSON.stringify(response['user']));
                this.router.navigate(['/alltrips']);
          }
        },
        error => this.error_message = 'Incorrect Email or Password'
    );
  }
  newRegistration() {
      this.loginService.displayRegistration = true;
  }
}
