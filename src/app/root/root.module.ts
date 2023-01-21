import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root/root.component';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class RootModule { }
