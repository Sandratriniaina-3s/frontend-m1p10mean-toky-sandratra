import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/types/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  saveData(jwt: Jwt){
    localStorage.setItem('token', jwt.token);
    localStorage.setItem('id', jwt._id);
    localStorage.setItem('role', jwt.role);
    this.redirection(jwt.role);
  }

  removeData(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }

  redirection(role: string){
    switch(role){
      case "Client":
        this.router.navigateByUrl('root/garage');
        break;
        case "Responsable atelier":
        this.router.navigateByUrl('root/workshop');
        break;
        case "Responsable financier":
        this.router.navigateByUrl('root/finance');
        break;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  get isLoggedIn(): boolean{
    let token = localStorage.getItem('token');
    return (token !== null) ? true : false;
  }

  logout(){
    this.removeData();
    this.router.navigate(['/']);
  }

}
