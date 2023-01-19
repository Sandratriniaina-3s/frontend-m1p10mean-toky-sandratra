import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  {
    path:'',
    component:RootComponent,
    children:[
      {path:'', redirectTo:'garage', pathMatch:'full'},
      {
        path: 'garage',
        loadChildren: () => import('../client/client.module').then((m) => m.ClientModule),
      },
      {
        path:'workshop',
        loadChildren:() => import('../workshop/workshop.module').then((m)=>m.WorkshopModule),
      },
      {
        path:'finance',
        loadChildren:()=>import('../finance-manager/finance-manager.module').then((m)=>m.FinanceManagerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
