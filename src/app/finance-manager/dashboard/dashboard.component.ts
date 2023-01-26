import { Component, OnInit } from '@angular/core';
import { DashboardData } from 'src/app/types/repairs.interface';
import { SubSink } from 'subsink';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private financeService:FinanceService) { }

  private subs = new SubSink();
  dashboardData !: DashboardData;
  isLoading = true ;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(){
    this.subs.sink = this.financeService.getDashboardData().subscribe((data)=>{
      this.dashboardData = data;
      this.isLoading = false;
    })
  }
}
