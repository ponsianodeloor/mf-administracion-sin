import {Component, OnInit} from '@angular/core';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {NotariasPesnotService} from "../../../services/notarias-pesnot.service";
import {UserSelected} from "../../../interfaces/user-selected";
import {ToastrService} from "ngx-toastr";
import {ParametrosNotarias} from "../../../interfaces/parametros-notarias";
import {EnvironmentService} from "../../../../../shared/services/environment.service";

@Component({
  selector: 'app-edit-bank-parameters',
  standalone: true,
  imports: [
    ShellMaterialModule
  ],
  templateUrl: './edit-bank-parameters.component.html',
  styleUrl: './edit-bank-parameters.component.scss'
})
export class EditBankParametersComponent implements OnInit {

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
  bankDetails: string;

  displayedColumns: string[] = ['label', 'value', 'action'];
  dataSource = [
    { label: 'CUENTA BANCARIA', value: 'cuenta septima pichincha quito' },
    { label: 'BANCO', value: 'Banco Guayaquil' },
    { label: 'RUC NOTARÍA', value: '1707514251001' },
    { label: 'TIPO DE CUENTA', value: 'Cuenta Corriente' }
  ];

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly notariasPesnotService: NotariasPesnotService,
    private readonly toastrService: ToastrService,
  ) {
    this.bankDetails = this.environmentService.bankDetails;
  }

  ngOnInit(): void {
    this.getUserSelectedFromLocalStorage();
  }

  //Obtiene el usuario seleccionado del localStorage
  getUserSelectedFromLocalStorage() {
    const userSelected = localStorage.getItem('userSelected');
    if (userSelected) {
      this.userSelected = JSON.parse(userSelected);
      this.idNotary = Number(this.userSelected.idNotaria);
      this.getParametersNotaries(this.bankDetails, this.idNotary);
    } else {
      this.toastrService.error('No se ha seleccionado un usuario', 'Error', {
        timeOut: 3000,
      });
    }
  }

  //Obtiene los parámetros de la notaría
  getParametersNotaries(codigo: string, idNotaria: number) {
    this.notariasPesnotService.getParametersNotaries(codigo, idNotaria).subscribe({
      next: (response) => {
        this.parametersNotaries = response;
      },
      error: (error) => {
        this.toastrService.error('Error al obtener los parámetros de la notaría', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

}
