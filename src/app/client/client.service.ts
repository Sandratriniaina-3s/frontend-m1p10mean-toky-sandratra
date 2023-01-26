import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment.dev';
import { Car, Criteria } from '../types/car.interface';
import { ApiResponse } from '../types/shared.interface';
import { Repair } from '../types/repairs.interface';
@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient) { }

  getAllCars(criteria:Criteria): Observable<Car[]>{
    return this.http
              .get(`${environment.apiUrl}/cars`, {params:{...criteria}})
              .pipe(map((response: ApiResponse)=> response.data as Car[]));
  }

  getCarById(carId:string):Observable<Car>{
    return this.http.get(`${environment.apiUrl}/cars/${carId}`).pipe(map((response:ApiResponse) => response.data as Car));
  }

  deleteCar(carId:string):Observable<void>{
    return this.http.delete(`${environment.apiUrl}/cars/${carId}`).pipe(map(() => {}));
  }

  saveCar(car:Car):Observable<Car>{
    return car._id
          ? this.http
                .put(`${environment.apiUrl}/cars/${car._id}`, car)
                .pipe(map((response:ApiResponse)=>response.data as Car))
          :this.http
               .post(`${environment.apiUrl}/cars`, car)
               .pipe(map((response:ApiResponse)=>response.data as Car))
  }

  getCarHistory(carId:string):Observable<Repair[]>{
    return this.http
                .get(`${environment.apiUrl}/repairs/car`, {params:{carId}})
                .pipe(map((response:ApiResponse)=>response.data as Repair[]))
  }

}
