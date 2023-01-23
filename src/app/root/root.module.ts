import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root/root.component';


import { SideNavComponent } from "./side-nav/side-nav.component";


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        RootComponent,
        SideNavComponent,
    ],
    imports: [
        CommonModule,
        RootRoutingModule,
        MatIconModule,
        MatButtonModule,

        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule
    ]
})
export class RootModule { }
