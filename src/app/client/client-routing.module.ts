import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/authentication.guard';
import { CarHistoryComponent } from './car-history/car-history.component';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { RepairsDetailsComponent } from './repairs-details/repairs-details.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    {
      path :'cars',
      children:[
        {path:'', redirectTo:'list',pathMatch:'full'},
        {path:'list',canActivate:[AuthGuard], component:CarsListComponent,data:{title : 'Voitures'}},
        {path:'detail/:carId',canActivate:[AuthGuard], component:CarsDetailsComponent,data:{title : 'Voiture'}},
        {path:'history/:carId',canActivate:[AuthGuard], component:CarHistoryComponent,data:{title:'Historique'}}
      ]
    },
    {
      path :'repairs',
      children:[
        {path:'', redirectTo:'list',pathMatch:'full'},
        {path:'list', component:RepairsListComponent,canActivate:[AuthGuard],data:{title : 'Voitures'}},
        {path:'detail/:repairId',canActivate:[AuthGuard], component:RepairsDetailsComponent,data:{title : 'Voiture'}},
      ]
    },
    {
      path:'profil', component:ClientAccountComponent,canActivate:[AuthGuard], data:{title:'Mon profile'}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
