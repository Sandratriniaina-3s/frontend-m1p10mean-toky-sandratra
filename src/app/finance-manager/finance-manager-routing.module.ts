import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/authentication.guard';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';

const routes: Routes = [
    { path:'', redirectTo:'dashboard', pathMatch:'full'},
    { path:'dashboard',canActivate:[AuthGuard], component:DashboardComponent},
    { path : 'administration',canActivate:[AuthGuard], component:AdministrationComponent},
    {
      path : 'payment',
      children:[
        { path:'', redirectTo:'list', pathMatch:'full'},
        {path:'list',canActivate:[AuthGuard], component:PaymentsListComponent},
        {path:'detail/:id',canActivate:[AuthGuard], component:PaymentsDetailComponent},
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceManagerRoutingModule { }
