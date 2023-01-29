import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { map, Observable } from 'rxjs';
import { Criteria } from '../types/car.interface';
import { Operation, Repair } from '../types/repairs.interface';
import { ApiResponse } from '../types/shared.interface';

@Injectable({
  providedIn: 'root'
})

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

    /* REPAIRS */

    saveRepair(repair: Repair):Observable<Repair>{
      return repair._id
            ? this.http
                  .put(`${environment.apiUrl}/repairs/${repair._id}`, repair)
                  .pipe(map((response:ApiResponse)=>response.data as Repair))
            :this.http
                 .post(`${environment.apiUrl}/repairs`, repair)
                 .pipe(map((response:ApiResponse)=>response.data as Repair))
    }

    getAllRepairs(): Observable<Repair[]>{
      return this.http
                .get(`${environment.apiUrl}/repairs`)
                .pipe(map((response: ApiResponse)=> response.data as Repair[]));
    }

    saveRepairAndStart(repair: Repair): Observable<any>{
      return this.http.put(`${environment.apiUrl}/repairs/${repair._id}/operation`,repair)
                .pipe(map((response: ApiResponse)=> response.data));
    }

    getRepairstatusDeposited(status: string): Observable<Repair[]>{
      return this.http
                .get(`${environment.apiUrl}/repairs/status/${status}`)
                .pipe(map((response: ApiResponse)=> response.data as Repair[]));
    }

    getRepairBySupervisor(id: string): Observable<Repair[]>{
      return this.http
                .get(`${environment.apiUrl}/repairs/supervisor/${id}`)
                .pipe(map((response: ApiResponse)=> response.data as Repair[]));
    }

    getRepairsTerminatedBySupervisor(id: string): Observable<any>{
      return this.http
                .get(`${environment.apiUrl}/repairs/finished/supervisor/${id}`)
                .pipe(map((response: ApiResponse)=> response.data));
    }

    getRepairsDetailById(id: string): Observable<any>{
      return this.http
                .get(`${environment.apiUrl}/repairs/detail/${id}`)
                .pipe(map((response: ApiResponse)=> response.data));
    }


}
