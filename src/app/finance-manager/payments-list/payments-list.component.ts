import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RepairsFormComponent } from 'src/app/client/repairs-form/repairs-form.component';
import { Payment } from 'src/app/types/payments.interface';
import { Repair } from 'src/app/types/repairs.interface';
import { UserRole } from 'src/app/types/user.interface';
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

  @ViewChild('table', { static: true, read: MatTable })
  table!: { renderRows: () => void; };

  constructor(private financeService: FinanceService, private dialog: MatDialog) { }
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

  onAddClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";
    dialogConfig.data = { role: UserRole.RESPONABLE_FINANCIER};
    let dialogRef = this.dialog.open(RepairsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res.data !== undefined){
        this.dataSource.data.push(res.data);
        this.table.renderRows();
      }
    })
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
