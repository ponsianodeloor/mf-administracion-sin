import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ParametrosFacturacionNotariasRoutingModule } from './parametros-facturacion-notarias-routing.module';

@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ParametrosFacturacionNotariasRoutingModule
  ]
})
export class ParametrosFacturacionNotariasModule { }
