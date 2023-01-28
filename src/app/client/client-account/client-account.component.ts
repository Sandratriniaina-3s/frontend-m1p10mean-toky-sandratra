import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { User } from 'src/app/types/user.interface';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
export class ClientAccountComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService,
    private tokenService:TokenService,
    private formBuilder:FormBuilder,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUser();
    setTimeout(()=>{
      this.form = this.initForm(this.user);
    },150)
  }

  private subs = new SubSink();
  hide = true
  user!:User;
  form!:any;
  enabledForm:boolean = false;

  loadUser(){
    const userId = this.tokenService.getId();
    this.subs.sink = this.authenticationService.getUserById(userId as string).subscribe((value)=>{
      this.user = value;
    })
  }

  save(form:any){
    const client = this.form.value.newPassword !=='' ? {...form.value, password: this.form.value.newPassword} : form.value;
    this.authenticationService.saveUser(client).subscribe((res)=>{});
    this.snackBar.open("Profil mis à jour avec succès", undefined, { duration: 5000 })
    this.loadUser();
  }

  private initForm(user:User){
    return this.formBuilder.group({
      _id:[user?._id],
      firstName:[user?.firstName],
      lastName:[user?.lastName],
      email:[user?.email],
      telephone:[user?.telephone],
      login:[user?.login],
      password:[user?.password],
      newPassword:['']
    })
  }
}
