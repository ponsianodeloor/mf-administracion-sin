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

}
