import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ParametrosFacturacionNotariasRoutingModule } from './parametros-facturacion-notarias-routing.module';
import { BreadcrumsComponent } from '../../shared/components/breadcrums/breadcrums.component';
import { TablaSearchComponent } from '../../shared/components/tabla-search/tabla-search.component';

@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ParametrosFacturacionNotariasRoutingModule,
    BreadcrumsComponent,
    TablaSearchComponent
  ]
})
export class ParametrosFacturacionNotariasModule { }
