import { Component } from '@angular/core';
import { TokenService } from 'src/app/shared/service/token.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(private tokenService: TokenService){}

  isExpanded: boolean = true;
  userRole = this.tokenService.getRole();

}
