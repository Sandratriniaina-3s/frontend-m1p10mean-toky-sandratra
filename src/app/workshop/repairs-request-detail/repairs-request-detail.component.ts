import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { Repair, RepairStatus } from 'src/app/types/repairs.interface';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-repairs-request-detail',
  templateUrl: './repairs-request-detail.component.html',
  styleUrls: ['./repairs-request-detail.component.css']
})
export class RepairsRequestDetailComponent implements OnInit, OnDestroy {

  constructor(private workshopService: WorkshopService, private tokenService: TokenService) { }

  ngOnDestroy(): void {
    if (this.operationsList !== undefined && this.repair !== undefined && this.repair.supervisor._id !== undefined) {
      this.repair.operations = this.operationsList;
      this.repairToSend = this.repair;
      this.repairToSend.supervisor = this.repair.supervisor._id;
      if (this.repair.status === RepairStatus.TO_BE_TAKEN) {
        this.repairToSend.finishedAt = new Date();

        /* -- BEGIN SEND MAIL -- */

        /* -- END SEND MAIL -- */

      }

      this.repairSub = this.workshopService.saveRepairAndStart(this.repairToSend).subscribe(res => {
      })

    }

    this.repairSub.unsubscribe();
  }

  operationsList:any;
  repair: any ;
  repairSub: Subscription = new Subscription();
  repairToSend = {} as Repair;

  ngOnInit(): void {
    this.getRepair();
  }

  getRepair(){
    this.repairSub =  this.workshopService.getRepairBySupervisor(this.tokenService.getId() as string).subscribe(res => {
      if(res[0] !== undefined){
        this.repair = res[0];
        this.operationsList = this.repair.operations;
      }
    })
  }

  drop(event: any) {
    moveItemInArray(this.operationsList, event.previousIndex, event.currentIndex);
  }

  disableChecker():boolean{
    return this.operationsList.every((v:any) => v.done === true);
  }

}
