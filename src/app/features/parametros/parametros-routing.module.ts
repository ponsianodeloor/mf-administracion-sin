import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BankingParametersNotaryPageComponent
} from "./pages/banking-parameters-notary-page/banking-parameters-notary-page.component";
import {ZoomParametersPageComponent} from "./pages/zoom-parameters-page/zoom-parameters-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'bancarios', component: BankingParametersNotaryPageComponent },
      { path: 'zoom', component: ZoomParametersPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
