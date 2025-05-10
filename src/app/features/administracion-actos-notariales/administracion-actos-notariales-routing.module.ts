import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionCatalogoComponent } from './pages/administracion-catalogo/administracion-catalogo.component';
import { FormPesnotCatCatalogoPadreComponent } from './components/form-pesnot-cat-catalogo-padre/form-pesnot-cat-catalogo-padre.component';
import { FormPesnotCatCatalogoChildComponent } from './components/form-pesnot-cat-catalogo-child/form-pesnot-cat-catalogo-child.component';
import { FormPesnotCatDocumentosObligatoriosComponent } from './components/form-pesnot-cat-documentos-obligatorios/form-pesnot-cat-documentos-obligatorios.component';

const routes: Routes = [
  {
    path: 'catalogo',
    component: AdministracionCatalogoComponent,
    children: [
      {
        path: 'categoria',
        component: FormPesnotCatCatalogoPadreComponent
      },
      {
        path: 'subcategoria',
        component: FormPesnotCatCatalogoChildComponent
      },
      {
        path: 'documento',
        component: FormPesnotCatDocumentosObligatoriosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionActosNotarialesRoutingModule { }
