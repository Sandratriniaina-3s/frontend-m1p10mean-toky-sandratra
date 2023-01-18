import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceManagerRoutingModule } from './finance-manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsFormComponent } from './payments-form/payments-form.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { AdministrationComponent } from './administration/administration.component';
import { FinanceService } from './finance.service';


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
    FinanceManagerRoutingModule
  ],
  providers:[
    {
      provide:FinanceService,
      useClass:FinanceService
    }
  ]
})
export class FinanceManagerModule { }
