import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userStorage;
  email;
  user;
  phone;
  userId;
  error_message;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userStorage = JSON.parse(localStorage.getItem('User'));
    this.email = this.userStorage['email'];
    this.user = this.userStorage['username'];
    this.phone = this.userStorage['phone'];
    this.userId = this.userStorage['id'];
    this.loginForm = this.formBuilder.group({
      user: [this.user, Validators.required],
      phone: [this.phone, Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmpassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log('test');
    const requestBody = {
      id: this.userId,
      username: this.loginForm.value['user'],
      password: this.loginForm.value['password'],
      phone: this.loginForm.value['phone']
    };
    console.log(requestBody);
    // this.userService.loginUser(UserData).subscribe(
    //     response => {
    //         console.log(response);
    //       localStorage.setItem('Token', (response['token']['key']));
    //         if (localStorage.getItem('Token') != null) {
    //             localStorage.setItem('User', JSON.stringify(response['user']));
    //             this.router.navigate(['/alltrips']);
    //       }
    //     },
    //     error => this.error_message = 'Incorrect Email or Password'
    // );
  }

}
