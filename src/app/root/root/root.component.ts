import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { User } from 'src/app/types/user.interface';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit{
  constructor(private tokenService: TokenService, private authenticationService:AuthenticationService){}
  
  private subs = new SubSink();
  userId = this.tokenService.getId();
  user:User|null=null;
  ngOnInit(): void {
    this.subs.sink = this.authenticationService.getUserById(this.userId as string).subscribe((user)=>{
      this.user = user;
    })
  }

  logOut(){
    this.tokenService.logout()
  }
}
