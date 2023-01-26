import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RepairsFormComponent } from 'src/app/client/repairs-form/repairs-form.component';
import { Repair } from 'src/app/types/repairs.interface';
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
  displayedColumns : string[] = ['registration','brand', 'model','status','arrive', 'actions'];
  element = null;
  elementIndex : number =  -1;
  searchTerm: string = '';
  repairSub : Subscription = new Subscription();

  @ViewChild('table', { static: true, read: MatTable })
  table!: { renderRows: () => void; };

  constructor(private workshopService: WorkshopService, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.repairSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadRepairs();
  }

  loadRepairs(){
    this.repairSub = this.workshopService.getAllRepairs().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      for(var repair of this.dataSource.data){
        this.separateDateAndTime(repair);
      }
    })
  }

  separateDateAndTime(repair: { date: string; time: string; arrivedAt: Date }){
    let date = new Date(repair.arrivedAt).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: '2-digit' });
    let time = new Date(repair.arrivedAt).toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' });
    repair.date = date;
    repair.time = time;
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

  onTakeClick(){
    let i : number = this.elementIndex;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";
    dialogConfig.data = { role: UserRole.RESPONABLE_ATELIER, request: this.element };
    let dialogRef = this.dialog.open(RepairsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res.data !== undefined){
        //this.separateDateAndTime(res.data);
        this.dataSource.data.splice(i,1,res.data);
        //this.dataSource.data.push(res.data);
        this.table.renderRows();
      }
    })
  }

  onMouseOver(row:any, ind: number){
    row.actions = true;
    this.element = row;
    this.elementIndex = ind;
  }

  onMouseLeave(row: any){
    row.actions = false;
    this.element = null;
  }

}
