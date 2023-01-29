import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Repair} from 'src/app/types/repairs.interface';
import { UserRole } from 'src/app/types/user.interface';
import { WorkshopService } from 'src/app/workshop/workshop.service';
import { RepairsDetailsComponent } from '../repairs-details/repairs-details.component';
import { RepairsFormComponent } from '../repairs-form/repairs-form.component';

@Component({
  selector: 'app-repairs-list',
  templateUrl: './repairs-list.component.html',
  styleUrls: ['./repairs-list.component.css']
})
export class RepairsListComponent implements OnInit, OnDestroy {

  repairRequest = {} as Repair;
  dataSource!: MatTableDataSource<any>;
  displayedColumns : string[] = ['registration','brand', 'model','status','arrive', 'actions'];
  element = null;
  searchTerm: string = '';
  repairSub : Subscription = new Subscription();
  isLoading = true ;

  @ViewChild('table', { static: true, read: MatTable })
  table!: { renderRows: () => void; };

  constructor(private workshopService: WorkshopService, private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.repairSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadRepairs();
  }

  loadRepairs() {
    this.repairSub = this.workshopService.getAllRepairs().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      for (var repair of this.dataSource.data) {
        this.separateDateAndTime(repair);
      }
      this.isLoading = false;
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

  onAddClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "auto";
    dialogConfig.data = { role: UserRole.CLIENT};
    let dialogRef = this.dialog.open(RepairsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res.data !== undefined){
        this.separateDateAndTime(res.data);
        this.dataSource.data.push(res.data);
        this.table.renderRows();
      }
    })
  }

  onViewClik(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    dialogConfig.height = "auto";
    dialogConfig.data = { repair: this.element, role: UserRole.CLIENT } ;
    this.dialog.open(RepairsDetailsComponent, dialogConfig);
  }

  onMouseOver(row:any){
    if(row.supervisor !== undefined){
      row.actions = true;
      this.element = row;
    }
  }

  onMouseLeave(row: any){
    row.actions = false;
    this.element = null;
  }

}
