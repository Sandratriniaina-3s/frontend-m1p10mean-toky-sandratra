import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_CRITERIA } from 'src/app/client/client.contants';
import { EMPTY_OPERATION } from 'src/app/constants/workshop.constants';
import { Operation } from 'src/app/types/repairs.interface';
import { SubSink } from 'subsink';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent implements OnInit {

  constructor(private workshopService:WorkshopService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loadOperations();
  }

  private subs = new SubSink();
  operations: Operation[] = [];
  searchTerm: string = '';
  currentOperation!: Operation;
  isEditing:boolean = false;
  isNew:boolean = false;
  form = this.intiForm(EMPTY_OPERATION);

  private loadOperations(){
    this.subs.sink = this.workshopService.getAllOperations(DEFAULT_CRITERIA).subscribe((res)=>{
      this.operations = res;
    });
  }

  search(){}

  private intiForm(operation:Operation){
    return this.formBuilder.group({
      _id:[operation._id],
      label:[operation.label],
      cost:[operation.cost],
      duration:[operation.duration]
    })
  }

  cancel(){
    this.isEditing = false;
    this.isNew = false;
  }

  // onDelete(operation : string):void{
  //   const dialog = this.dialog.open(DeleteCarDialog);
  //   dialog.afterClosed().subscribe(res =>{
  //     if(res){
  //       this.clientService.deleteCar(operation).subscribe(res=>{
  //         this.cars = this.cars.filter(item => item._id !== operation);
  //         this.snackBar.open('Suppression effectuée', undefined, {duration: 3000});
  //       })

  //       setTimeout(()=>{
  //         this.loadOperations();
  //       },200)
  //     }
  //   })
  // }

  saveOperation(form:any){
    const operation = form.value as Operation;
    this.workshopService.saveOperation(operation).subscribe((res)=>{});
    this.isEditing = false;
    this.isNew = false;
    setTimeout(()=>{
      this.loadOperations();
    })
  }

  edit(operation:Operation){
    this.isEditing = true;
    this.form = this.intiForm(operation);
    this.currentOperation = operation;
  }

  create(){
    this.isNew = true;
    this.form = this.intiForm(EMPTY_OPERATION);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


// @Component({
//   selector: 'delete-car-dialog',
//   templateUrl: 'delete-car-dialog.html',
// })

// export class DeleteCarDialog{

// }