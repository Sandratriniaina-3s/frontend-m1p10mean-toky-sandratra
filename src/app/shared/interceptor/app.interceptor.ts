import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({providedIn: 'root'})
export class AppInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(request);

    const token = this.tokenService.getToken();

    if(token !== null){
      let clone = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
      console.log(clone)
      return next.handle(clone).pipe(
        catchError(error => {
          console.log(error);
          if(error.status === 401){
            this.tokenService.logout();
          }
          return throwError('Session Expired');
        } )
      )
    }

    return next.handle(request);
  }
}

export const AppInterceptorProvider =
{
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
}

