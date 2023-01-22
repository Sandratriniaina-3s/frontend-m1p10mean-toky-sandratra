import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isExpanded: boolean = true;

  //Responsable financier
  //Responsable atelier
  userRole = "Responsable financier"

}
