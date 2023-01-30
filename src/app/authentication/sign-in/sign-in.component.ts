import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { Jwt } from 'src/app/types/jwt.interface';
import { User } from 'src/app/types/user.interface';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(private snackBar: MatSnackBar ,private formBuilder:FormBuilder, private authService: AuthenticationService , private tokenService: TokenService) { }

  form!: FormGroup;
  load: boolean = true;
  user = {} as User;
  loginSub: Subscription = new Subscription();
  btnLoginState : boolean = true
  credentials = {
    login:'Finance',
    passowrd:'1234'
  }

  ngOnInit(): void {
    const role = this.tokenService.getRole();
    if(role == null){
      this.form = this.initForm();
      this.load = false;
    }
    else{
      this.tokenService.redirection(role);
    }
  }

  private initForm():FormGroup{
    return this.formBuilder.group({
      login:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onPasswordInput(){
    this.user.password = this.form.controls['password'].value;
  }

  onLoginInput(){
    this.user.login = this.form.controls['login'].value;
  }

  login(){
    this.loginSub = this.authService
      .getUserByLoginAndPassword(this.user)
      .subscribe((res) => {
        console.log(res)
        if(res.data == null){
          this.form.reset();
          this.snackBar.open("  Login et/ou mot de passe incorrects ", undefined, { duration: 5000 })
        }
        else{
          let jwt = res.data as Jwt;
          this.tokenService.saveData(jwt);
        }
      });
  }

  valCheck(formControlName: string):boolean {
    if(this.form.controls[formControlName].value == ""){
      return true;
    }
    else{
      return false;
    }
  }

  disableCheck():boolean{
    if(this.valCheck('login') || this.valCheck('password')){
      this.btnLoginState = true;
    }
    else{
      this.btnLoginState = false;
    }
    return this.btnLoginState;
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

}
