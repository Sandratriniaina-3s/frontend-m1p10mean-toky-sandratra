import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { map, Observable } from 'rxjs';
import { DashboardData } from '../types/repairs.interface';
import { ApiResponse } from '../types/shared.interface';

@Injectable()

export class FinanceService {

  constructor(private http:HttpClient) { }

  getDashboardData():Observable<DashboardData>{
    return this.http.get(`${environment.apiUrl}/repairs/dashboard`).pipe(map((response:ApiResponse)=>response.data as DashboardData))
  }

}
