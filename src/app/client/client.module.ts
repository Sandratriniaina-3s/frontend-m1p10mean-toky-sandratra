import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';
import { RepairsDetailsComponent } from './repairs-details/repairs-details.component';
import { RepairsFormComponent } from './repairs-form/repairs-form.component';
import { CarHistoryComponent } from './car-history/car-history.component';
import { ClientService } from './client.service';


@NgModule({
  declarations: [
    CarsListComponent,
    CarsDetailsComponent,
    ClientAccountComponent,
    RepairsListComponent,
    RepairsDetailsComponent,
    RepairsFormComponent,
    CarHistoryComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  providers:[
    {
      provide:ClientService,
      useClass:ClientService,
    }
  ]
})
export class ClientModule { }
