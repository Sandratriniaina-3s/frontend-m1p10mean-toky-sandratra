import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
    },
    {
      path:'authentication',
      loadChildren:() => import('./authentication/authentication.module').then((m)=> m.AuthenticationModule),
    },
    {
      path:'workshop',
      loadChildren:() => import('./workshop/workshop.module').then((m)=>m.WorkshopModule),
    },
    {
      path:'finance',
      loadChildren:()=>import('./finance-manager/finance-manager.module').then((m)=>m.FinanceManagerModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
