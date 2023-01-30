import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RepairsFormComponent } from 'src/app/client/repairs-form/repairs-form.component';
import { Payment } from 'src/app/types/payments.interface';
import { Repair } from 'src/app/types/repairs.interface';
import { UserRole } from 'src/app/types/user.interface';
import { WorkshopService } from 'src/app/workshop/workshop.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<any>;
  displayedColumns : string[] = ['clientFullName','car' ,'totalOperation', 'paid', 'amount', 'actions'];
  element = null;
  searchTerm: string = '';
  paymentSub : Subscription = new Subscription();
  isLoading = true ;
  payments!:Payment[];
  repairs!:Repair[];
  repair!:Repair;

  @ViewChild('table', { static: true, read: MatTable })
  table!: { renderRows: () => void; };

  constructor(private financeService: FinanceService, private dialog: MatDialog , private workshopService:WorkshopService) { }
  ngOnDestroy(): void {
    this.paymentSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(){
    this.paymentSub = this.financeService.getAllUnpaidRepairs().subscribe((res)=>{
      this.repairs = res;
      this.isLoading = false;
    })
  }

  loadRepair(repair:string){
    return new Promise<void>((resolve)=>{
      this.workshopService.getRepairsDetailById(repair).subscribe((value)=>{
        this.repair = value[0];
        resolve()
        console.log(this.repair)
      })
    })
  }

  onAddClick(repair:string){
    this.loadRepair(repair).then(()=>{
      console.log(this.repair)
      this.dialog.open(PaymentDialog,{data:this.repair});
    });
  }

  onSearchClick(){

  }

  disableCheck(){

  }

  onMouseLeave(row: any){

  }

  onMouseOver(row: any){

  }

}

@Component({
  selector: 'payment-dialog',
  templateUrl: 'payment-dialog.html',
})

export class PaymentDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: Repair) {}
}

