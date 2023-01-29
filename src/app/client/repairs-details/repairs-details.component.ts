import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WorkshopService } from 'src/app/workshop/workshop.service';

@Component({
  selector: 'app-repairs-details',
  templateUrl: './repairs-details.component.html',
  styleUrls: ['./repairs-details.component.css']
})
export class RepairsDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private workshopService: WorkshopService) { }

  repair :any
  operationList: any
  detailSub = new Subscription();
  role: string = "";

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.detailSub = this.workshopService.getRepairsDetailById(this.data.repair._id).subscribe(res => {
      if(res.length !== 0){
        this.role = this.data.role;
        this.operationList = res[0].operations;
        this.repair = res[0];
      }
    })
  }


}
