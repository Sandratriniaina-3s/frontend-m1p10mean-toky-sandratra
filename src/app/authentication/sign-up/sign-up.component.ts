import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserRole } from 'src/app/types/user.interface';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(
    private authentificationService: AuthenticationService,
    private router: Router, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  hide = true
  form !: FormGroup;
  btnRegisterState: boolean = true;
  user = {} as User;
  createUserSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.form = this.initForm()
    this.user.role = UserRole.CLIENT;
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLastNameInput() {
    this.user.lastName = this.form.controls['lastName'].value;
  }

  onFirstNameInput() {
    this.user.firstName = this.form.controls['firstName'].value;
  }

  onEmailInput() {
    this.user.email = this.form.controls['email'].value;
  }

  onTelephoneInput() {
    this.user.telephone = this.form.controls['telephone'].value;
  }

  onLoginInput() {
    this.user.login = this.form.controls['login'].value;
  }

  onPasswordInput() {
    this.user.password = this.form.controls['password'].value;
  }

  onValiderClick() {

    this.user.fullName = this.user.lastName + this.user.firstName


    this.createUserSub = this.authentificationService
      .saveUser(this.user)
      .subscribe((res) => {
        this.snackBar.open("  Message success  ", undefined, { duration: 2000 }).afterDismissed().subscribe(() => {
          this.router.navigate(['/']);
        });
      });
  }

  valCheck(formControlName: string): boolean {
    if (this.form.controls[formControlName].value == "") {
      return true;
    }
    else {
      return false;
    }
  }

  disableCheck(): boolean {
    if (this.valCheck('firstName') || this.valCheck('lastName') || this.valCheck('email') || this.valCheck('telephone') || this.valCheck('login') || this.valCheck('password')) {
      this.btnRegisterState = true;
    }
    else {
      this.btnRegisterState = false;
    }
    return this.btnRegisterState;
  }

  ngOnDestroy(): void {
    this.createUserSub.unsubscribe();
  }

}
