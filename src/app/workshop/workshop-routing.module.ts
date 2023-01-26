import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { RepairsRequestDetailComponent } from './repairs-request-detail/repairs-request-detail.component';
import { RepairsRequestListComponent } from './repairs-request-list/repairs-request-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'repairs', pathMatch: 'full' },
  {
    path:'repairs',
    children:[
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list' , component:RepairsRequestListComponent, data:{title : 'Réparations'}},
      { path: 'detail' , component:RepairsRequestDetailComponent, data:{title : 'Réparations'}},
      { path:'detail/reapair/:id' , component:RepairsRequestDetailComponent, data:{title: 'Réparation'}}
    ]
  },
  {
    path:'operations', component:OperationsListComponent, data : {title:''}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
