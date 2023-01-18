import { Component, OnInit,OnDestroy } from '@angular/core';
import { Car } from 'src/app/types/car.interface';
import { SubSink } from 'subsink';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, OnDestroy {

  constructor(private clientService: ClientService) { }
  
  cars: Car[] = [];
  subs = new SubSink();
  
  ngOnInit(): void {
    this.subs.sink = this.clientService.getAllCars().subscribe((cars)=>{
      this.cars = cars;
    })
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
