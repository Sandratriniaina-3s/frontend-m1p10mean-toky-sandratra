import { Component, OnInit,OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY_CAR } from 'src/app/constants/car.constants';
import { Car } from 'src/app/types/car.interface';
import { SubSink } from 'subsink';
import { DEFAULT_CRITERIA } from '../client.contants';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, OnDestroy {

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  cars: Car[] = [];
  subs = new SubSink();
  searchTerm: string = '';
  currentCar!:Car;
  isEditing:boolean = false;
  isNew: boolean = false;

  ngOnInit(): void {
    this.loadCars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.currentCar){
      this.form = this.initForm(this.currentCar);
    }
  }

  form = this.initForm(EMPTY_CAR);

  loadCars(){
    this.subs.sink = this.clientService.getAllCars(DEFAULT_CRITERIA).subscribe((cars)=>{
      this.cars = cars;
    })
  }

  search(): void{
    this.subs.sink = this.clientService.getAllCars({...DEFAULT_CRITERIA, search:this.searchTerm}).subscribe((cars)=>{
      this.cars = cars;
    })
  }

  onDelete(car : string):void{
    const dialog = this.dialog.open(DeleteCarDialog);
    dialog.afterClosed().subscribe(res =>{
      if(res){
        this.clientService.deleteCar(car).subscribe(res=>{
          this.cars = this.cars.filter(item => item._id !== car);
          this.snackBar.open('Suppression effectuée', undefined, {duration: 3000});
        })

        setTimeout(()=>{
          this.loadCars();
        },200)
      }
    })
  }

  edit(car:Car){
    this.form = this.initForm(car);
    this.currentCar = car;
    this.isEditing = true;
  }

  cancelEdit(){
    this.isEditing = false;
  }

  saveCar(form:any){
    const car = form.value as Car;
    this.clientService.saveCar(car).subscribe((res)=>{});
    this.isEditing = false;
    this.isNew = false;
    setTimeout(()=>{
      this.loadCars();
    },100);
  }

  create(){
    this.form = this.initForm(EMPTY_CAR);
    this.isNew = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(car:Car){
    return this.formBuilder.group({
      _id:[car._id],
      brand:[car.brand, Validators.required],
      model:[car.model, Validators.required],
      registration:[car.registration, Validators.required]
    })
  }
}

@Component({
  selector: 'delete-car-dialog',
  templateUrl: 'delete-car-dialog.html',
})

export class DeleteCarDialog{

}
