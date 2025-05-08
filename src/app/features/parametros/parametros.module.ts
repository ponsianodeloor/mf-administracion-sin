import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import {ShellMaterialModule} from "../../shared/modules/shell-material.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ShellMaterialModule
  ]
})
export class ParametrosModule { }
