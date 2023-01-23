import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { map, Observable } from 'rxjs';
import { Criteria } from '../types/car.interface';
import { Operation } from '../types/repairs.interface';
import { ApiResponse } from '../types/shared.interface';

@Injectable()
export class WorkshopService {

  constructor(private http:HttpClient) { }

  getAllOperations(criteria:Criteria): Observable<Operation[]>{
    return this.http
              .get(`${environment.apiUrl}/operations`, {params:{...criteria}})
              .pipe(map((response: ApiResponse)=> response.data as Operation[]));
  }

  getOperationById(operationId:string):Observable<Operation>{
    return this.http.get(`${environment.apiUrl}/operations/${operationId}`).pipe(map((response:ApiResponse) => response.data as Operation));
  }

  deleteOperation(operationId:string):Observable<void>{
    return this.http.delete(`${environment.apiUrl}/operations/${operationId}`).pipe(map(() => {}));
  }

  saveOperation(operation:Operation):Observable<Operation>{
    return operation._id
          ? this.http
                .put(`${environment.apiUrl}/operations/${operation._id}`, operation)
                .pipe(map((response:ApiResponse)=>response.data as Operation))
          :this.http
               .post(`${environment.apiUrl}/operations`, operation)
               .pipe(map((response:ApiResponse)=>response.data as Operation))
  }
}
