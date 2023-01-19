import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../types/shared.interface';
import { User } from '../types/user.interface';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  saveUser(user:User):Observable<User>{
    return user._id
          ? this.http
                .put(`${environment.apiUrl}/users/${user._id}`, user)
                .pipe(map((response:ApiResponse)=>response.data as User))
          :this.http
               .post(`${environment.apiUrl}/users`, user)
               .pipe(map((response:ApiResponse)=>response.data as User))
  }

  getUserByLoginAndPassword(userLogin:string, userPassword:string):Observable<User>{
    return this.http.get(`${environment.apiUrl}/users/${userLogin}/${userPassword}`).pipe(map((response:ApiResponse) => response.data as User));
  }

  getUserById(userId:string):Observable<User>{
    return this.http.get(`${environment.apiUrl}/users/${userId}`).pipe(map((response:ApiResponse) => response.data as User));
  }

}

