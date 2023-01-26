import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FinanceService } from 'src/app/finance-manager/finance.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Car } from 'src/app/types/car.interface';
import { Payment } from 'src/app/types/payments.interface';
import { Operation, Repair, RepairStatus } from 'src/app/types/repairs.interface';
import { UserRole } from 'src/app/types/user.interface';
import { WorkshopService } from 'src/app/workshop/workshop.service';
import { DEFAULT_CRITERIA } from '../client.contants';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-repairs-form',
  templateUrl: './repairs-form.component.html',
  styleUrls: ['./repairs-form.component.css']
})
export class RepairsFormComponent implements OnInit, OnDestroy {

  repairRequest = {} as Repair;
  carsList: Car[] = [];
  operationsList: Operation[] = [];
  operationsForm: FormControl = new FormControl('');
  carsForm: FormControl = new FormControl('');
  noteForm: FormControl = new FormControl('');
  btnSaveState : boolean = true;
  repairSub: Subscription = new Subscription();

  carInfo: string = "";
  selectedOperationLength = 0;
  formGroup = new FormGroup({
    operationForm: new FormControl(),
    costForm: new FormControl(),
    durationForm: new FormControl(),
    arrivedDateForm: new FormControl(),
    repairBeginForm: new FormControl(),
    repairEndForm: new FormControl(),
    noteForm: new FormControl()
  });

  repairPaymentForm: FormControl = new FormControl([Validators.required]);
  amountForm: FormControl = new FormControl();
  paidAmountForm: FormControl = new FormControl();
  repairsList : Repair[] = [];
  payment = {} as Payment;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tokeService: TokenService, private authServive: AuthenticationService ,private clientService: ClientService, private workshopService: WorkshopService, private dialogRef: MatDialogRef<RepairsFormComponent>, private financeService: FinanceService) { }

  ngOnInit(): void {
    switch (this.data.role) {
      case UserRole.CLIENT:
        this.loadAllCars();
        this.loadAllOPerations();
        break;
      case UserRole.RESPONABLE_ATELIER:
        this.loadRespoAteData();
        break;
      case UserRole.RESPONABLE_FINANCIER:
        this.loadRepairs();
        break;
    }
  }

  /* CLIENT */
  ngOnDestroy(): void {
    this.repairSub.unsubscribe();
  }

  loadAllCars(){
    this.clientService.getAllCars(DEFAULT_CRITERIA).subscribe((cars)=>{
      this.carsList = cars;
    })
  }

  loadAllOPerations(){
    this.workshopService.getAllOperations(DEFAULT_CRITERIA).subscribe((res)=>{
      this.operationsList = res;
    })
  }

  totalAmountOperation(operationList: any):number{
    let cost = 0 ;
    for (var operation of operationList) {
      cost = cost + parseInt(operation.cost)
    }
    return cost;
  }

  onSaveClick(){
    this.repairRequest.car = this.carsForm.value;
    this.repairRequest.status = RepairStatus.DEPOSITED;
    this.repairRequest.arrivedAt = new Date();
    if(this.operationsForm.value.length > 0) {
      this.repairRequest.operations = [];
      this.repairRequest.cost = this.totalAmountOperation(this.operationsForm.value);
      this.repairRequest.operations = this.operationsForm.value;
    }

    if(this.noteForm.value != ""){
      this.repairRequest.note = this.noteForm.value;
    }

    this.repairSub = this.workshopService.saveRepair(this.repairRequest).subscribe(
      res =>{
        console.log(res)
        this.dialogRef.close({data: res});
      }
    )

  }

  disableCheck(){
    if(this.carsForm.value == ""){
      this.btnSaveState = true;
    }
    else{
      this.btnSaveState = false;
    }
    return this.btnSaveState;
  }

  /* RESPONSABLE ATELIER */
  loadRespoAteData(){
    this.repairRequest = this.data.request;
    let car =  this.repairRequest.car as Car;
    this.carInfo = car.brand + " - " + car.model + " ( " + car.registration + " )" ;
    this.setDataToForm();
    if(this.repairRequest.operations == undefined){
      this.loadAllOPerations();
    }
    else{
      this.operationsList = this.repairRequest.operations as Operation[];
    }
  }

  setDataToForm(){
    this.formGroup.controls['noteForm'].setValue(this.repairRequest.note);
    this.formGroup.controls['arrivedDateForm'].setValue(Reflect.get(this.repairRequest, 'date') + "  /  " + Reflect.get(this.repairRequest, 'time'));
    if(this.repairRequest.reparationDuration != undefined){
      this.formGroup.controls['durationForm'].setValue(this.repairRequest.reparationDuration);
    }
    if(this.repairRequest.reparationBegin != undefined){
      this.formGroup.controls['repairBeginForm'].setValue(this.repairRequest.reparationBegin);
    }
    if(this.repairRequest.finishedAt != undefined){
      this.formGroup.controls['repairEndForm'].setValue(this.repairRequest.finishedAt);
    }
  }

  setFormValueToRepairRequest(){
    this.repairRequest.reparationBegin = this.formGroup.controls['repairBeginForm'].value;
    this.repairRequest.finishedAt = this.formGroup.controls['repairEndForm'].value;
    this.repairRequest.reparationDuration = this.formGroup.controls['durationForm'].value;
    if(this.formGroup.controls['noteForm'].value !== ""){
      this.repairRequest.note = this.formGroup.controls['noteForm'].value;
    }
    if(this.formGroup.controls['operationForm'].value != null){
      this.repairRequest.operations = this.formGroup.controls['operationForm'].value;
    }
  }

  onConfirmClick(){
    this.setFormValueToRepairRequest();

    let time = Reflect.get(this.repairRequest, 'time');
    let date = Reflect.get(this.repairRequest, 'date');
    Reflect.deleteProperty(this.repairRequest, 'time');
    Reflect.deleteProperty(this.repairRequest, 'date');
    Reflect.deleteProperty(this.repairRequest, 'actions');

    this.authServive.getUserById(this.tokeService.getId() as string).subscribe( user => {
      this.repairRequest.supervisor = user;
      this.repairSub = this.workshopService.saveRepair(this.repairRequest).subscribe( res =>{
        Reflect.set(res, 'time', time);
        Reflect.set(res, 'date', date);
        Reflect.set(res, 'actions', false);
        this.dialogRef.close({data: res});
      })
    })

  }

  onSelectionChange(){
    this.selectedOperationLength = this.formGroup.controls['operationForm'].value.length;
    this.repairRequest.cost = this.totalAmountOperation(this.formGroup.controls['operationForm'].value);
    this.formGroup.controls['costForm'].setValue( this.repairRequest.cost + " Ar")
  }

  /* RESPONSABLE FINANCIER */
  loadRepairs(){
    this.workshopService.getAllRepairs().subscribe( res =>{
      this.repairsList = res ;
    })
  }

  onRepairSelectionChange(){
    this.amountForm.setValue(this.repairPaymentForm.value.cost + " Ar")
  }

  onConfirmPaymentClick(){
    this.payment.amount = this.paidAmountForm.value;
    this.payment.repair = this.repairPaymentForm.value;
    this.repairSub = this.financeService.savePayment(this.payment).subscribe(
      res =>{
        this.dialogRef.close({data: res});
      }
    )
  }

}
