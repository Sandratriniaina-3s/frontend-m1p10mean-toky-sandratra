import { Component, Input, OnInit } from '@angular/core';
import { Repair } from 'src/app/types/repairs.interface';

@Component({
  selector: 'app-car-history',
  templateUrl: './car-history.component.html',
  styleUrls: ['./car-history.component.css']
})
export class CarHistoryComponent implements OnInit {

  constructor() { }
  @Input() carHistory:Repair[]=[];

  ngOnInit(): void {
  }

}
