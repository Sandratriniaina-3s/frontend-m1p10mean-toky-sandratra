import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { EMPTY_USER, User } from 'src/app/types/user.interface';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  isLoading = false ;

  constructor(
    private formBuilder:FormBuilder,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private subs = new SubSink();
  hide = true;
  users!:User[];
  user!:User;
  isNew = false;
  isEditing = false;
  roles:string[] = ['Responsable atelier', 'Responsable financier'];
  form = this.initForm(EMPTY_USER);

  save(form:any){
    const user =  this.form.value.newPassword !=='' ? {...form.value, password: this.form.value.newPassword} : form.value;
    this.subs.sink = this.authenticationService.saveUser(user).subscribe((res)=>{});
    setTimeout(()=>{
      this.loadUsers();
    },100)
  }

  loadUser(userId:string){
    this.subs.sink = this.authenticationService.getUserById(userId).subscribe((value)=>{
      this.user = value;
      this.isLoading = false;
      this.form = this.initForm(value)
    })
  }

  loadUsers(){
    this.subs.sink = this.authenticationService.getAllUsers().subscribe((value)=>{
      this.users = value;
    })
  }

  edit(userId:string){
    this.isEditing = true,
    this.loadUser(userId);
  }

  create(){
    this.isNew = true;
    this.isEditing = false;
    this.form = this.initForm(EMPTY_USER);
  }


  onDelete(userId : string):void{
    const dialog = this.dialog.open(DeleteDialog);
    dialog.afterClosed().subscribe((res:any) =>{
      if(res){
        this.subs.sink = this.authenticationService.deleteUser(userId).subscribe((res)=>{});
        this.snackBar.open('Suppression effectuée', undefined, {duration: 3000});
        setTimeout(()=>{
          this.loadUsers();
        },100)
      }
    })
  }

  cancel(){
    this.isNew = false;
    this.isEditing = false;
  }

  private initForm(user:User){
    return this.formBuilder.group({
      _id:[user?._id],
      firstName:[user?.firstName],
      lastName:[user?.lastName],
      email:[user?.email],
      telephone:[user?.telephone],
      login:[user?.login],
      role:[user?.role],
      password:[user?.password],
      newPassword:['']
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})

export class DeleteDialog{
}
