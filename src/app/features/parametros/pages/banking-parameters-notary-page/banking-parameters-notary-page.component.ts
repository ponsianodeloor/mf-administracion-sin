import { Component } from '@angular/core';
import {BreadcrumbItem} from "../../../../core/models/util/breadcrumbItem";
import {BreadcrumsComponent} from "../../../../shared/components/breadcrums/breadcrums.component";
import {EditBankParametersComponent} from "../../components/tables/edit-bank-parameters/edit-bank-parameters.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {NgIf} from "@angular/common";
import {ShellMaterialModule} from "../../../../shared/modules/shell-material.module";

@Component({
  selector: 'app-banking-parameters-notary-page',
  standalone: true,
  imports: [
    BreadcrumsComponent,
    EditBankParametersComponent,
    LoaderComponent,
    NgIf,
    ShellMaterialModule
  ],
  templateUrl: './banking-parameters-notary-page.component.html',
  styleUrl: './banking-parameters-notary-page.component.scss'
})
export class BankingParametersNotaryPageComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home ', url: '', active: true },
    { name: ' Parámetros de la Notaría', url: '', active: false },
  ];

  isLoading = false;

}
