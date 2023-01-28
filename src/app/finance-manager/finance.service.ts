import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { map, Observable } from 'rxjs';
import { Payment, Receipt } from '../types/payments.interface';
import { Profit } from '../types/profit.interface';
import { DashboardData, Repair } from '../types/repairs.interface';
import { ApiResponse } from '../types/shared.interface';

@Injectable({
  providedIn: 'root'
})

export class FinanceService {

  constructor(private http:HttpClient) { }

  getDashboardData():Observable<DashboardData>{
    return this.http.get(`${environment.apiUrl}/repairs/dashboard`).pipe(map((response:ApiResponse)=>response.data as DashboardData))
  }

  /* PAYMENT */
  savePayment(payment: Payment):Observable<Payment>{
    return payment._id
          ? this.http
                .put(`${environment.apiUrl}/payments/${payment._id}`, payment)
                .pipe(map((response:ApiResponse)=>response.data as Payment))
          :this.http
               .post(`${environment.apiUrl}/payments`, payment)
               .pipe(map((response:ApiResponse)=>response.data as Payment))
  }

  getAllPayments(): Observable<Payment[]>{
    return this.http
              .get(`${environment.apiUrl}/payments`)
              .pipe(map((response: ApiResponse)=> response.data as Payment[]));
  }

  getPaymentById(paymentId:string):Observable<Payment>{
    return this.http.get(`${environment.apiUrl}/payments/${paymentId}`).pipe(map((response:ApiResponse) => response.data as Payment));
  }

  getPaymentByRepair(repairId:string):Observable<Payment>{
    return this.http.get(`${environment.apiUrl}/payments/repair/${repairId}`).pipe(map((response:ApiResponse) => response.data as Payment));
  }

  deletePayment(paymentId:string):Observable<void>{
    return this.http.delete(`${environment.apiUrl}/payments/${paymentId}`).pipe(map(() => {}));
  }

  /**RECEIPT */

  getPaimentReceipt(paymendId:string):Observable<Receipt>{
    return this.http.get(`${environment.apiUrl}/payments/receipt/${paymendId}`).pipe(map((response:ApiResponse)=>response.data as Receipt))
  }

  /** PROFIT */
  saveProfit(profit: Profit):Observable<Profit>{
    return profit._id
          ? this.http
                .put(`${environment.apiUrl}/profits/${profit._id}`, profit)
                .pipe(map((response:ApiResponse)=>response.data as Profit))
          :this.http
               .post(`${environment.apiUrl}/profits`, profit)
               .pipe(map((response:ApiResponse)=>response.data as Profit))
  }

  getAllProfits(): Observable<Profit[]>{
    return this.http
              .get(`${environment.apiUrl}/profits`)
              .pipe(map((response: ApiResponse)=> response.data as Profit[]));
  }
}
