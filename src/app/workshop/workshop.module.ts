import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { RepairsRequestListComponent } from './repairs-request-list/repairs-request-list.component';
import { RepairsRequestDetailComponent } from './repairs-request-detail/repairs-request-detail.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { WorkshopService } from './workshop.service';


@NgModule({
  declarations: [
    RepairsRequestListComponent,
    RepairsRequestDetailComponent,
    OperationsListComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule
  ],
  providers:[
    {
      provide: WorkshopService,
      useClass: WorkshopService
    }
  ]
})
export class WorkshopModule { }
