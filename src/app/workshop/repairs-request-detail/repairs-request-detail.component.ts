import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FinanceService } from 'src/app/finance-manager/finance.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Car } from 'src/app/types/car.interface';
import { EMPTY_PAYMENT, Payment, PaymentStatus } from 'src/app/types/payments.interface';
import { MailData, Repair, RepairStatus } from 'src/app/types/repairs.interface';
import { User } from 'src/app/types/user.interface';
import { SubSink } from 'subsink';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-repairs-request-detail',
  templateUrl: './repairs-request-detail.component.html',
  styleUrls: ['./repairs-request-detail.component.css'],
})
export class RepairsRequestDetailComponent implements OnInit, OnDestroy {
  constructor(
    private workshopService: WorkshopService,
    private tokenService: TokenService,
    private financeService: FinanceService,
    private formBuilder:FormBuilder,
  ) {}

  ngOnDestroy(): void {
    if (
      this.operationsList !== undefined &&
      this.repair !== undefined &&
      (this.repair.supervisor as User)._id !== undefined
    ) {
      this.repair.operations = this.operationsList;
      this.repairToSend = this.repair;
      this.repairToSend.supervisor = (this.repair.supervisor as User)._id;
      if (this.repair.status === RepairStatus.TO_BE_TAKEN) {
        this.repairToSend.finishedAt = new Date();

        /* -- BEGIN SEND MAIL -- */
        const mailData:MailData = {
          clientMail:((this.repair.car as Car).client as User).email,
          clientName:((this.repair.car as Car).client as User).firstName,
          carRegistration:(this.repair.car as Car).registration,
        }
        this.workshopService.sendMail(mailData).subscribe((res)=>{})
        /* -- END SEND MAIL -- */
      }

      this.repairSub = this.workshopService
        .saveRepairAndStart(this.repairToSend)
        .subscribe((res) => {});
    }

    this.repairSub.unsubscribe();
  }

  operationsList: any;
  repair!: Repair;
  repairSub: Subscription = new Subscription();
  repairToSend = {} as Repair;
  payment!: Payment;
  form = this.initForm(EMPTY_PAYMENT);
  private subs = new SubSink();

  ngOnInit(): void {
    this.getRepair();
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.getRepair();
  }

  getRepair() {
    this.repairSub = this.workshopService
      .getRepairBySupervisor(this.tokenService.getId() as string)
      .subscribe((res) => {
        if (res[0] !== undefined) {
          this.repair = res[0];
          this.operationsList = this.repair.operations;
          console.log(res[0])
          if (res[0].paymentStatus === PaymentStatus.PAID) {
            this.loadPayment(res[0]._id);
          }
        }
      });
  }

  drop(event: any) {
    moveItemInArray(
      this.operationsList,
      event.previousIndex,
      event.currentIndex
    );
  }

  disableChecker(): boolean {
    return this.operationsList.every((v: any) => v.done === true);
  }

  onPay(form: any) {
    const payment = form.value as Payment;
    this.financeService
      .savePayment({
        ...payment,
        repair: this.repair._id,
        createdAt: new Date(),
      })
      .subscribe((res) => {});
    this.workshopService
      .saveRepair({ ...this.repair, paymentStatus: PaymentStatus.PAID })
      .subscribe((res) => {console.log(res)});
    setTimeout(() => {
      this.getRepair();
    }, 200);
  }

  loadPayment(repairId: string) {
    this.subs.sink = this.financeService
      .getPaymentByRepair(repairId)
      .subscribe((value) => {
        this.payment = value;
      });
  }

  private initForm(payment: Payment) {
    return this.formBuilder.group({
      _id: [payment._id],
      amount: [payment.amount, Validators.required],
    });
  }
}
