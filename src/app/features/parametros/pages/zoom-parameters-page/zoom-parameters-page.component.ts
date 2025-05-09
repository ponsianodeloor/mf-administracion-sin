import { Component } from '@angular/core';
import {BreadcrumbItem} from "../../../../core/models/util/breadcrumbItem";
import {BreadcrumsComponent} from "../../../../shared/components/breadcrums/breadcrums.component";
import {MatDividerModule} from "@angular/material/divider";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {NgIf} from "@angular/common";
import {EditBankParametersComponent} from "../../components/tables/edit-bank-parameters/edit-bank-parameters.component";
import {EditZoomParametersComponent} from "../../components/cards/edit-zoom-parameters/edit-zoom-parameters.component";

@Component({
  selector: 'app-zoom-parameters-page',
  standalone: true,
  imports: [
    BreadcrumsComponent,
    MatDividerModule,
    LoaderComponent,
    NgIf,
    EditZoomParametersComponent
  ],
  templateUrl: './zoom-parameters-page.component.html',
  styleUrl: './zoom-parameters-page.component.scss'
})
export class ZoomParametersPageComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home ', url: '', active: true },
    { name: ' Parámetros de la Notaría', url: '', active: false },
  ];

  isLoading = false;

}
