import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  //isOpen:boolean = false;
  constructor(){}
  /*toggleMenu(){
    this.isOpen = !this.isOpen;
  }*/

  logOut(){
    console.log("Logout");
  }
}
