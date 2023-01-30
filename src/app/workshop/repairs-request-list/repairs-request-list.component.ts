import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RepairsDetailsComponent } from 'src/app/client/repairs-details/repairs-details.component';
import { RepairsFormComponent } from 'src/app/client/repairs-form/repairs-form.component';
import { TokenService } from 'src/app/shared/service/token.service';
import { Repair, RepairStatus } from 'src/app/types/repairs.interface';
import { UserRole } from 'src/app/types/user.interface';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-repairs-request-list',
  templateUrl: './repairs-request-list.component.html',
  styleUrls: ['./repairs-request-list.component.css']
})

export class RepairsRequestListComponent implements OnInit, OnDestroy {

  repairRequest = {} as Repair;
  dataSource!: MatTableDataSource<any>;
  displayedColumns : string[] = ['registration','brand', 'model','operation','arrive', 'actions'];
  element = null;
  elementIndex : number =  -1;
  searchTerm: string = '';
  repairSub : Subscription = new Subscription();
  isLoading = true ;
  disableOtherTask = true;

  selectedTab = new FormControl(0);

  dataSourceLength:number = 0;

  @ViewChild('table', { static: true, read: MatTable })
  table!: { renderRows: () => void; };

  @ViewChild('repCompo')
  repairsDetailCompo!: {
    ngOnDestroy: () => void; ngOnInit: () => void;
};

  constructor(private workshopService: WorkshopService, private dialog: MatDialog, private tokenService: TokenService) { }

  ngOnDestroy(): void {
    this.repairsDetailCompo.ngOnDestroy();
    this.repairSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadRepairs();
  }

  onSelectedTabChange(ind:any){
    if(ind == 1){
        this.repairsDetailCompo.ngOnInit();
    }
    else if(ind == 2){
      this.loadRepairedData();
      this.repairsDetailCompo.ngOnDestroy();
    }
    else{
      this.ngOnInit();
      this.repairsDetailCompo.ngOnDestroy();
    }
  }

  loadRepairs(){


    this.repairSub = this.workshopService.getRepairstatusDeposited(RepairStatus.DEPOSITED).subscribe((res)=>{
      if(res !== undefined){
        this.dataSource = new MatTableDataSource(res);
        this.dataSourceLength = this.dataSource.data.length;
        this.workshopService.getRepairBySupervisor(this.tokenService.getId() as string).subscribe((res)=>{
          if(res.length > 0){
            this.disableOtherTask = true;
          }
          else{
            this.disableOtherTask = false;
          }
        })
      }
      this.isLoading = false;
    })

  }

  onSearchClik(){

  }

  disableCheck():boolean{
    if(this.searchTerm == ""){
      return true;
    }
    else{
      return false;
    }
  }

  onAddOperationClick(){
    let i : number = this.elementIndex;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "auto";
    dialogConfig.data = { role: UserRole.RESPONABLE_ATELIER, request: this.element };
    let dialogRef = this.dialog.open(RepairsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res.data !== undefined){
        this.dataSource.data.splice(i,1,res.data);
        this.table.renderRows();
      }
    })
  }

  onMouseOver(row:any, ind: number){
    this.element = row;
    this.elementIndex = ind;
  }

  onMouseLeave(row: any){
    this.element = null;
  }

  onViewDetailClik(){
    let i : number = this.elementIndex;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "auto";
    dialogConfig.data = { role: UserRole.RESPONABLE_ATELIER, request: this.element };
    let dialogRef = this.dialog.open(RepairsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res.data !== undefined){
        this.dataSource.data.splice(i,1);
        this.dataSourceLength = this.dataSource.data.length;
        this.table.renderRows();
        this.disableOtherTask = true;
        this.selectedTab.setValue(1);
      }
    })
  }

  /* ------------ REPARATION TERMINATED ---- */
  dataSourceRepairedLength :number = 0;
  dataSourceRepaired!: MatTableDataSource<any>;
  columnsRepaired : string[] = ['registration','car','operation','arrive','finish','actions'];

  loadRepairedData(){
     this.workshopService.getRepairsTerminatedBySupervisor(this.tokenService.getId() as string).subscribe(res =>{
      if (res !== undefined) {
        this.dataSourceRepaired = new MatTableDataSource(res);
        this.dataSourceRepairedLength = this.dataSourceRepaired.data.length;
      }
    })
  }

  onRepairedMouseLeave(row: any){
    this.element = null;
  }

  onRepairedMouseOver(row: any, index: number){
    this.element = row;
  }

  onRepairedViewDetailClick(){

    console.log(this.element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    dialogConfig.height = "auto";
    dialogConfig.data = { repair: this.element, role: UserRole.RESPONABLE_ATELIER } ;
    this.dialog.open(RepairsDetailsComponent, dialogConfig);
  }




}
