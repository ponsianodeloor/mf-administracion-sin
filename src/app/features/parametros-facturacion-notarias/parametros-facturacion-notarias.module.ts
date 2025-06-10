import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ParametrosFacturacionNotariasRoutingModule } from './parametros-facturacion-notarias-routing.module';
import { BreadcrumsComponent } from '../../shared/components/breadcrums/breadcrums.component';
import { TablaSearchComponent } from '../../shared/components/tabla-search/tabla-search.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ParametrosFacturacionNotariasRoutingModule,
    BreadcrumsComponent,
    TablaSearchComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FileUploadComponent
  ]
})
export class ParametrosFacturacionNotariasModule { }
