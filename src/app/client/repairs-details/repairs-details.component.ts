import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operation, Repair } from 'src/app/types/repairs.interface';

@Component({
  selector: 'app-repairs-details',
  templateUrl: './repairs-details.component.html',
  styleUrls: ['./repairs-details.component.css']
})
export class RepairsDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  repair :any
  operationList: Operation[] = []

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(){
    this.operationList = this.data.repair.operations;
    this.repair = this.data.repair;
  }


}
