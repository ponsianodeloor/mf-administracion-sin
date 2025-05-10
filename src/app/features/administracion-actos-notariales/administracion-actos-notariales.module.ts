import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AdministracionActosNotarialesRoutingModule } from './administracion-actos-notariales-routing.module';
import { AdministracionCatalogoComponent } from './pages/administracion-catalogo/administracion-catalogo.component';
import { TreeViewComponent } from '../../shared/components/tree-view/tree-view.component';

@NgModule({
  declarations: [
    AdministracionCatalogoComponent
  ],
  imports: [
    CommonModule,
    AdministracionActosNotarialesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    TreeViewComponent
  ],
})
export class AdministracionActosNotarialesModule { }
