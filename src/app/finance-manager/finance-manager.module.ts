import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceManagerRoutingModule } from './finance-manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsFormComponent } from './payments-form/payments-form.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { AdministrationComponent } from './administration/administration.component';
import { FinanceService } from './finance.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent,
    PaymentsListComponent,
    PaymentsDetailComponent,
    PaymentsFormComponent,
    PaymentsDetailComponent,
    AdministrationComponent
  ],
  imports: [
    CommonModule,
    FinanceManagerRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers:[
    {
      provide:FinanceService,
      useClass:FinanceService
    }
  ]
})
export class FinanceManagerModule { }
