import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { RepairsRequestListComponent } from './repairs-request-list/repairs-request-list.component';
import { RepairsRequestDetailComponent } from './repairs-request-detail/repairs-request-detail.component';
import { DeleteOperationDialog, OperationsListComponent } from './operations-list/operations-list.component';
import { WorkshopService } from './workshop.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RepairsRequestListComponent,
    RepairsRequestDetailComponent,
    OperationsListComponent,
    DeleteOperationDialog
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers:[
    {
      provide: WorkshopService,
      useClass: WorkshopService
    }
  ]
})
export class WorkshopModule { }
