import { Component } from '@angular/core';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";

@Component({
  selector: 'app-edit-bank-parameters',
  standalone: true,
  imports: [
    ShellMaterialModule
  ],
  templateUrl: './edit-bank-parameters.component.html',
  styleUrl: './edit-bank-parameters.component.scss'
})
export class EditBankParametersComponent {

  displayedColumns: string[] = ['label', 'value', 'action'];
  dataSource = [
    { label: 'CUENTA BANCARIA', value: 'cuenta septima pichincha quito' },
    { label: 'BANCO', value: 'Banco Guayaquil' },
    { label: 'RUC NOTARÍA', value: '1707514251001' },
    { label: 'TIPO DE CUENTA', value: 'Cuenta Corriente' }
  ];


}
