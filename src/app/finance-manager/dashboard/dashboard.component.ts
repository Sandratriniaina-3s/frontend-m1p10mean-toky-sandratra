import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { EMPTY_PROFIT, Profit } from 'src/app/types/profit.interface';
import { DashboardData } from 'src/app/types/repairs.interface';
import { SubSink } from 'subsink';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private financeService:FinanceService, private formBuilder:FormBuilder) { }

  private subs = new SubSink();
  dashboardData !: DashboardData;
  profits!:Profit[];
  isLoading = true ;
  form = this.initForm(EMPTY_PROFIT);
  isNew: boolean = false;
  isDetail:boolean = false;
  currentProfit!:Profit|null;
  period = `${(new Date().getMonth()+1).toString().padStart(2,'0')}/${new Date().getFullYear().toString()}`;

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadProfits();
  }

  loadDashboardData(){
    this.subs.sink = this.financeService.getDashboardData().subscribe((data)=>{
      this.dashboardData = data;
      this.isLoading = false;
    })
  }
  
  loadProfits(){
    this.subs.sink = this.financeService.getAllProfits().subscribe((data)=>{
      this.profits = data;
    })
  }

  getProfitAmount(){
      const expenses = Number(this.form.value.loan as number) + Number(this.form.value.others as number) + Number( this.form.value.salary as number) + Number(this.form.value.purchases as number);
      return this.dashboardData.monthlyTurnover - expenses;
  }
  
  saveProfit(form:any){
    const profit = form.value as Profit;
    this.financeService.saveProfit({...profit, createdAt:new Date(), date:this.period, amount:this.getProfitAmount()}).subscribe((res)=>{});
    setTimeout(()=>{
      this.loadProfits();
    },100);
  }

  createProfit(){
    this.isNew = true;
    this.initForm(EMPTY_PROFIT);
  }

  viewDetail(profit:Profit){
    this.isDetail = true;
    this.initForm(profit);
    this.form.disable();
  }
  
  cancel(){
    this.isNew=false;
    this.isDetail=false;
  }

  private initForm(profit:Profit){
    return this.formBuilder.group({
        _id:[profit?._id],
        date:[profit.date,Validators.required],
        salary:[profit.salary, Validators.required],
        purchases:[profit.purchases, Validators.required],
        loan:[profit.loan, Validators.required],
        others:[profit.others]
    })
  }
}
