import { Component } from '@angular/core';
import { TokenService } from 'src/app/shared/service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  //isOpen:boolean = false;
  constructor(private tokenService: TokenService){}
  /*toggleMenu(){
    this.isOpen = !this.isOpen;
  }*/

  logOut(){
    this.tokenService.logout()
  }
}
