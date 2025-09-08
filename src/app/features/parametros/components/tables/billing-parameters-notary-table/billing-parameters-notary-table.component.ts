import {Component, OnInit} from '@angular/core';
import {ParametrosFacturacionNotarias} from "../../../../../shared/interfaces/parametros-facturacion-notarias";
import {NotariasPesnotService} from "../../../../../shared/services/notarias-pesnot.service";
import {MatTableModule} from "@angular/material/table";
import {UserSelected} from "../../../interfaces/user-selected";
import {ToastrService} from "ngx-toastr";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateParametrosFacturacionNotariasModalComponent } from '../../modals/create-or-update-parametros-facturacion-notarias-modal/create-or-update-parametros-facturacion-notarias-modal.component';

@Component({
  selector: 'app-billing-parameters-notary-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './billing-parameters-notary-table.component.html',
  styleUrl: './billing-parameters-notary-table.component.scss'
})
export class BillingParametersNotaryTableComponent implements OnInit{

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

  idNotary: number = 0;

  parametersBillingNotary:ParametrosFacturacionNotarias[] = [];

  displayedColumns: string[] = [
    'idParametrosFacturacionNotarias',
    'idNotaria',
    'claveAcceso',
    'numeroRuc',
    'tipoAmbiente',
    'establecimiento',
    'puntoEmision',
    'razonSocial',
    'codigoContribuyenteEspecial',
    'obligadoContabilidad'
  ];

  constructor(
    private readonly notariasPesnotService:NotariasPesnotService,
    private readonly toastrService: ToastrService,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getUserSelectedFromLocalStorage();
  }

  //Obtiene el usuario seleccionado del localStorage
  getUserSelectedFromLocalStorage() {
    const userSelected = localStorage.getItem('userSelected');
    if (userSelected) {
      this.userSelected = JSON.parse(userSelected);
      this.idNotary = Number(this.userSelected.idNotaria);
      this.getBillingParametersNotaries(this.idNotary);
    } else {
      this.toastrService.error('No se ha seleccionado un usuario', 'Error', {
        timeOut: 3000,
      });
    }
  }

  getBillingParametersNotaries(idNotary: number) {
    this.notariasPesnotService.getBillingParametersNotaries(idNotary).subscribe({
      next: (resp) => {
        this.parametersBillingNotary = resp;
        console.log(this.parametersBillingNotary);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateOrUpdateParametrosFacturacionNotariasModalComponent, {
      height: '70vh',
      width: '80vw',
      data: { idNotary: this.idNotary },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // Refresca la tabla al cerrar el modal
      this.getBillingParametersNotaries(this.idNotary);
    });
  }

  onEdit(element: ParametrosFacturacionNotarias) {
    console.log('Editar elemento:', element);
    // Aquí puedes agregar la lógica para editar el elemento
  }

}
