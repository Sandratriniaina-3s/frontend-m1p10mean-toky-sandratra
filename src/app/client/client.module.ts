import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ClientRoutingModule } from './client-routing.module';
import { CarHistoryDialog, CarsListComponent, DeleteCarDialog } from './cars-list/cars-list.component';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { RepairsListComponent } from './repairs-list/repairs-list.component';
import { RepairsDetailsComponent } from './repairs-details/repairs-details.component';
import { RepairsFormComponent } from './repairs-form/repairs-form.component';
import { CarHistoryComponent } from './car-history/car-history.component';
import { ClientService } from './client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { CastToCarPipe } from '../pipes/cast-to-car.pipe';

@NgModule({
  declarations: [
    CarsListComponent,
    CarsDetailsComponent,
    ClientAccountComponent,
    RepairsListComponent,
    RepairsDetailsComponent,
    RepairsFormComponent,
    CarHistoryComponent,
    DeleteCarDialog,
    CarHistoryDialog,
    //CastToCarPipe
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers:[
    {
      provide:ClientService,
      useClass:ClientService,
    }
  ]
})
export class ClientModule { }
