import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'actos-notariales',
    loadChildren: () => import('./administracion-actos-notariales/administracion-actos-notariales.module').then(m => m.AdministracionActosNotarialesModule)
  },
  {
    path: 'parametros',
    loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'facturacion-notarias',
    loadChildren: () => import('./parametros-facturacion-notarias/parametros-facturacion-notarias.module').then(m => m.ParametrosFacturacionNotariasModule)
  },
  {
    path: 'capacitacion',
    loadChildren: () => import('./capacitacion/capacitacion.module').then(m => m.CapacitacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
