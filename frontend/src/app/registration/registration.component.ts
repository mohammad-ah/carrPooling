import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {UserService} from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  genderValue;
  matcher = new MyErrorStateMatcher();
  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get f() { return this.registerForm.controls; }


  onItemChange(value) {
    this.genderValue = value;
  }
  onSubmit() {
    // stop here if form is invalid
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
;
    delete this.registerForm.value['confirmPassword'];
    this.registerForm.value['gender'] = this.genderValue;
    this.userService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log(this.registerForm.value , 'has been Created');
        },
        error => console.log(error)
    );
  }

}
