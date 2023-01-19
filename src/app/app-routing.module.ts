import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'authentication', pathMatch: 'full' },
    {
      path:'authentication',
      loadChildren:() => import('./authentication/authentication.module').then((m)=> m.AuthenticationModule),
    },
    {
      path:'root',
      loadChildren:() => import('./root/root.module').then((m)=> m.RootModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
