import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowProfilePageComponent} from "./pages/show-profile-page/show-profile-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'show', component: ShowProfilePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
