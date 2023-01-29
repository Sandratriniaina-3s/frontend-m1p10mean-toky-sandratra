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
  operationsForm!: FormControl;
  carsForm!: FormControl;
  noteForm!: FormControl ;

  btnSaveState : boolean = true;
  repairSub: Subscription = new Subscription();

  repairAtelier: any;
  carInfo: string = "";
  selectedOperationLength = 0;
  formGroup = new FormGroup({
    operationForm: new FormControl(),
    costForm: new FormControl(),
    durationForm: new FormControl(),
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
        this.initClientForm();
        this.loadAllCars();
        this.loadAllOPerations();
        break;
      case UserRole.RESPONABLE_ATELIER:
        this.loadRespoAtelierData();
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
    this.clientService.getAllCars({...DEFAULT_CRITERIA, client:this.tokeService.getId() as string}).subscribe((cars)=>{
      this.carsList = cars;
    })
  }

  initClientForm(){
    this.carsForm = new FormControl('');
    this.noteForm = new FormControl('');
    this.operationsForm = new FormControl('');
  }

  loadAllOPerations(){
    this.workshopService.getAllOperations(DEFAULT_CRITERIA).subscribe((res)=>{
      this.operationsList = res;
    })
  }

  totalAmountOperation(operationList: any):number{
    let cost = 0 ;
    for (var operation of operationList) {
      cost = cost + parseInt(operation.cost);
    }
    return cost;
  }

  addFormValueToRequest(){
    this.repairRequest.arrivedAt = new Date();
    this.repairRequest.car = this.carsForm.value._id;
    this.repairRequest.status = RepairStatus.DEPOSITED;
    if(this.operationsForm.value.length > 0) {
      this.repairRequest.cost = this.totalAmountOperation(this.operationsForm.value);
      this.repairRequest.operations = [];
      this.calculateDurationAndExtractId(this.repairRequest);
    }
    else{
      this.repairRequest.cost = 0;
      this.repairRequest.reparationDuration = "0 jour";
    }
    if(this.noteForm.value != ""){
      this.repairRequest.note = this.noteForm.value;
    }
  }

  calculateDurationAndExtractId(repair: any){
    let duration = 0 ;
    this.operationsForm.value.forEach((element:Operation) => {
      duration = duration + parseInt(element.duration.toString());
      repair.operations.push(element._id);
    });
    repair.reparationDuration = duration +" jour(s)";
  }

  onSaveClick(){
    this.addFormValueToRequest();
    this.repairSub = this.workshopService.saveRepair(this.repairRequest).subscribe(
      res =>{
        res.car = this.carsForm.value;
        res.operations = this.operationsForm.value;
        this.dialogRef.close({data: res});
      }
    )
  }

  disableCheck(user: string):boolean{
    if(user == "client"){
      if(this.carsForm.value == ""){
        this.btnSaveState = true;
      }
      else{
        this.btnSaveState = false;
      }
    }
    else{
      if(this.operationsForm.value.length > 0){
        this.btnSaveState = false;
      }
      else{
        this.btnSaveState = true;
      }
    }
    return this.btnSaveState;
  }

  /* RESPONSABLE ATELIER */
  loadRespoAtelierData(){
    this.repairAtelier = this.data.request;
    if(this.repairAtelier.operations == undefined || this.repairAtelier.operations.length == 0){
      this.initRespoAtelierForm();
      this.loadAllOPerations();
    }
    else{
      this.operationsList = this.repairAtelier.operations;
      this.noteForm =  new FormControl(this.repairAtelier.note);
    }
  }

  initRespoAtelierForm(){
    this.noteForm = new FormControl(this.repairAtelier.note);
    this.operationsForm = new FormControl('');
  }

  addFormValueToRepairRequest(){
    this.repairAtelier.cost = this.totalAmountOperation(this.operationsForm.value);
    this.repairAtelier.operations = [];
    this.calculateDurationAndExtractId(this.repairAtelier);
    this.repairAtelier.note = this.noteForm.value;
  }

  onConfirmClick(value:string){
    switch(value){
      case "add":
        this.addOperation();
        break;
      case "take":
        this.takeRepairTask();
        break;
    }
  }

  addOperation(){
    this.addFormValueToRepairRequest();
    let car =  this.repairAtelier.car;
   this.repairSub = this.workshopService.saveRepair(this.repairAtelier).subscribe(res => {
      res.operations = this.operationsForm.value as Operation[];
      res.car = car ;
      this.dialogRef.close({ data: res });
    })
  }

  takeRepairTask(){
    this.repairAtelier.supervisor = this.tokeService.getId() as string;
    this.repairAtelier.status = RepairStatus.REPAIRING;
    this.repairAtelier.reparationBegin = new Date();
    this.repairAtelier.operations.forEach((element:any) => {
        Reflect.set(element, 'done', false);
    });
    this.repairSub = this.workshopService.saveRepairAndStart(this.repairAtelier).subscribe(res => {
      this.dialogRef.close({ data: res });
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
