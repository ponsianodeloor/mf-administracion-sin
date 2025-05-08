import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotarialRequestByIdNotaryPageComponent
} from "./pages/notarial-request-by-id-notary-page/notarial-request-by-id-notary-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'solicitudes', component: NotarialRequestByIdNotaryPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
