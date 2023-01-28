import { Component, EventEmitter, Input, OnInit, Output,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY_PAYMENT, Payment, PaymentStatus, Receipt } from 'src/app/types/payments.interface';
import { Repair } from 'src/app/types/repairs.interface';
import { WorkshopService } from 'src/app/workshop/workshop.service';
import { SubSink } from 'subsink';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.css']
})
export class PaymentsFormComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private financeService:FinanceService,
    private repairService: WorkshopService ,
    private dialog: MatDialog
  ){ }

  ngOnInit(): void {
  }
  private subs = new SubSink();
  @Input() repair!:Repair;
  @Output() savePayment : EventEmitter<Payment> = new EventEmitter<Payment>();

  payment!:Payment;
  receipt!:Receipt;
  form = this.initForm(EMPTY_PAYMENT);

  private initForm(payment:Payment){
    return this.formBuilder.group({
      _id:[payment._id],
      amount:[payment.amount,Validators.required],
    })
  }

  onSubmit(form:any){
    const payment = form.value as Payment;
    this.financeService.savePayment({...payment,repair : this.repair as Repair, createdAt:new Date()}).subscribe((res)=>{});
    this.repairService.saveRepair({...this.repair, paymentStatus:PaymentStatus.PAID}).subscribe((res)=>{});
  }

  loadPayment(){
    this.subs.sink = this.financeService.getPaymentByRepair(this.repair._id).subscribe((value)=>{
      this.payment = value;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadReceipt(payment:string){
    return new Promise<void>((resolve)=>{
      this.financeService.getPaimentReceipt(payment).subscribe((receipt)=>{
        this.receipt = receipt;
        resolve()
      })
    })
  }

  viewReceipt(){
    this.loadReceipt(this.payment?._id).then(()=>{
      this.dialog.open(ReceiptDialog,{data:this.receipt});
    });
  }

}

@Component({
  selector: 'receipt-dialog',
  templateUrl: 'receipt-dialog.html',
})

export class ReceiptDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: Receipt[]) {}
}
