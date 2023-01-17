import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarHistoryComponent } from './car-history/car-history.component';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { HomeComponent } from './home/home.component';
import { RepairsDetailsComponent } from './repairs-details/repairs-details.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component:HomeComponent,data:{title:'Accueil'}},
    {
      path :'cars',
      children:[
        {path:'', redirectTo:'list',pathMatch:'full'},
        {path:'list', component:CarsListComponent,data:{title : 'Voitures'}},
        {path:'detail/:carId', component:CarsDetailsComponent,data:{title : 'Voiture'}},
        {path:'history/:carId', component:CarHistoryComponent,data:{title:'Historique'}}
      ]
    },
    {
      path :'repairs',
      children:[
        {path:'list', component:RepairsListComponent,data:{title : 'Voitures'}},
        {path:'detail/:repairId', component:RepairsDetailsComponent,data:{title : 'Voiture'}},
      ]
    },
    {
      path:'profil', component:ClientAccountComponent, data:{title:'Mon profile'}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
