import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { CapacitacionRoutingModule } from './capacitacion-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    CapacitacionRoutingModule,
    MatDialogModule
  ]
})
export class CapacitacionModule { }
