import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgForOf, NgIf } from '@angular/common';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {UserSelected} from "../../../interfaces/user-selected";
import {ParametrosNotarias} from "../../../interfaces/parametros-notarias";
import {EnvironmentService} from "../../../../../shared/services/environment.service";
import {NotariasPesnotService} from "../../../services/notarias-pesnot.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-zoom-parameters',
  standalone: true,
  imports: [
    MatIconModule,
    ShellMaterialModule,
    MatSnackBarModule,
    ClipboardModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './edit-zoom-parameters.component.html',
  styleUrl: './edit-zoom-parameters.component.scss'
})
export class EditZoomParametersComponent implements OnInit {

  // Este objeto se utiliza para almacenar el usuario seleccionado del localStorage
  userSelected: UserSelected = {
    idPersona: 0,
    nombres: '',
    apellidos: '',
    correoElectronico: '',
    idCargo: 0,
    cargo: '',
    idDependencia: 0,
    nombreDependencia: '',
    idPuesto: 0,
    idPuestoFuncionario: 0,
    nombrePuesto: '',
    esPrincipal: false,
    idAcronimoNotaria: '',
    idNotaria: 0,
  };

  parametersNotaries: ParametrosNotarias[] = [];

  idNotary: number = 0;
  envZoomParameters: string;

  zoomParameters = [
    { id: 0, label: 'ZOOM_CLIENT_ID',     value: '', hidden: false, canToggle: false, helper: '' },
    { id: 0, label: 'ZOOM_CLIENT_SECRET', value: '', hidden: true,  canToggle: true,  helper: '' },
    { id: 0, label: 'ZOOM_ACCOUNT_ID',    value: '', hidden: false, canToggle: false, helper: '' },
    { id: 0, label: 'ZOOM_BASE_URL',      value: '', hidden: false, canToggle: false, helper: '' },
    { id: 0, label: 'ZOOM_SDK_KEY',       value: '', hidden: false, canToggle: false, helper: '' },
    { id: 0, label: 'ZOOM_SDK_SECRET',    value: '', hidden: true,  canToggle: true,  helper: '' },
    { id: 0, label: 'ZOOM_API_USER_ID',   value: '', hidden: false, canToggle: false, helper: '' },
    { id: 0, label: 'ZOOM_TOKEN_SECRET',  value: '', hidden: true,  canToggle: true,  helper: '' },
    { id: 0, label: 'ZOOM_TOKEN_VERIFY',  value: '', hidden: false, canToggle: false, helper: '' },
  ];

  constructor(
    private readonly clipboard: Clipboard,
    private readonly snackBar: MatSnackBar,
    private readonly environmentService: EnvironmentService,
    private readonly notariasPesnotService: NotariasPesnotService,
    private readonly toastrService: ToastrService,
  ) {
    this.envZoomParameters = this.environmentService.zoomParameters;
  }

  ngOnInit(): void {
    this.getUserSelectedFromLocalStorage();
  }

  copyToClipboard(param: any): void {
    this.clipboard.copy(param.value);
    this.snackBar.open(`${param.label} copiado`, 'Cerrar', {
      duration: 2000,
    });
  }

  //Obtiene el usuario seleccionado del localStorage
  getUserSelectedFromLocalStorage() {
    const userSelected = localStorage.getItem('userSelected');
    if (userSelected) {
      this.userSelected = JSON.parse(userSelected);
      this.idNotary = Number(this.userSelected.idNotaria);
      this.getParametersNotaries(this.envZoomParameters, this.idNotary);
    } else {
      this.toastrService.error('No se ha seleccionado un usuario', 'Error', {
        timeOut: 3000,
      });
    }
  }

  matchZoomParametersWithResponse(parametersNotaries: ParametrosNotarias[]): void {
    this.zoomParameters = this.zoomParameters.map(param => {
      const match = parametersNotaries.find(item => item.valor === param.label);
      if (match) {
        return {
          ...param,
          id: match.id,
          value: match.descripcion
        };
      }
      return param;
    });
  }

  hasEmptyValues(): boolean {
    const emptyParams = this.zoomParameters.filter(param => param.value === '');
    if (emptyParams.length > 0) {
      const labels = emptyParams.map(param => param.label).join(', ');
      this.toastrService.error(`Los siguientes parámetros no tienen valor: ${labels}`, 'Error', {
        timeOut: 3000,
      });
      return true;
    }
    return false;
  }

  //Obtiene los parámetros de la notaría
  getParametersNotaries(codigo: string, idNotaria: number) {
    this.notariasPesnotService.getParametersNotaries(codigo, idNotaria).subscribe({
      next: (response) => {
        this.parametersNotaries = response;
        this.matchZoomParametersWithResponse(this.parametersNotaries);
        this.hasEmptyValues();
      },
      error: (error) => {
        this.toastrService.error('Error al obtener los parámetros de la notaría', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

}
