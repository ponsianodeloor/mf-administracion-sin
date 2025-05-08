import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'parametros',
    loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
