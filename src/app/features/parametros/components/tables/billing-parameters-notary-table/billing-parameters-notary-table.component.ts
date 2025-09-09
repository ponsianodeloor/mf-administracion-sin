import {Component, HostListener, OnInit} from '@angular/core';
import {ParametrosFacturacionNotarias} from "../../../../../shared/interfaces/parametros-facturacion-notarias";
import {NotariasPesnotService} from "../../../../../shared/services/notarias-pesnot.service";
import {MatTableModule} from "@angular/material/table";
import {UserSelected} from "../../../interfaces/user-selected";
import {ToastrService} from "ngx-toastr";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateParametrosFacturacionNotariasModalComponent } from '../../modals/create-or-update-parametros-facturacion-notarias-modal/create-or-update-parametros-facturacion-notarias-modal.component';
import { EditGeneralParamsBillingByIdModalComponent } from '../../modals/edit-general-params-billing-by-id-modal/edit-general-params-billing-by-id-modal.component';
import { EditLogoBillingByIdModalComponent } from '../../modals/edit-logo-billing-by-id-modal/edit-logo-billing-by-id-modal.component';
import { EditElectronicSignBillingByIdModalComponent } from '../../modals/edit-electronic-sign-billing-by-id-modal/edit-electronic-sign-billing-by-id-modal.component';
import {RepositorioService} from "../../../../../shared/services/repositorio.service";

@Component({
  selector: 'app-billing-parameters-notary-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
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
  selectedId?: number;
  openMenuId: number | null = null;

  displayedColumns: string[] = [
    'idParametrosFacturacionNotarias',
    'numeroRuc',
    'tipoAmbiente',
    'establecimiento',
    'puntoEmision',
    'razonSocial',
    'codigoContribuyenteEspecial',
    'obligadoContabilidad',
    'logoEmisor',
    'nombreLogo'
  ];

  constructor(
    private readonly notariasPesnotService:NotariasPesnotService,
    private readonly toastrService: ToastrService,
    private readonly dialog: MatDialog,
    private readonly repositorioService: RepositorioService,
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

  onMenuOpened() {
    console.log('Actions menu opened. selectedId=', this.selectedId);
  }

  toggleRowMenu(id?: number) {
    if (!id) return;
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  openEditFromInline(id?: number, type: 'general'|'logo'|'sign' = 'general') {
    if (!id) return;
    switch (type) {
      case 'general': this.openEditGeneralParams(id); break;
      case 'logo': this.openEditLogo(id); break;
      case 'sign': this.openEditElectronicSign(id); break;
    }
    this.openMenuId = null;
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.inline-row-menu');
    const clickedToggleButton = target.closest('.row-menu-button');

    if (!clickedInsideMenu && !clickedToggleButton) {
      this.openMenuId = null;
    }
  }

  openEditGeneralParams(idParametrosFacturacionNotarias?: number) {
    if (!idParametrosFacturacionNotarias) return;
    const dialogRef = this.dialog.open(EditGeneralParamsBillingByIdModalComponent, {
      width: '70vw',
      maxWidth: '95vw',
      data: { idParametrosFacturacionNotarias },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBillingParametersNotaries(this.idNotary);
    });
  }

  openEditLogo(idParametrosFacturacionNotarias?: number) {
    if (!idParametrosFacturacionNotarias) return;
    const dialogRef = this.dialog.open(EditLogoBillingByIdModalComponent, {
      width: '60vw',
      maxWidth: '95vw',
      data: { idParametrosFacturacionNotarias },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBillingParametersNotaries(this.idNotary);
    });
  }

  openEditElectronicSign(idParametrosFacturacionNotarias?: number) {
    if (!idParametrosFacturacionNotarias) return;
    const dialogRef = this.dialog.open(EditElectronicSignBillingByIdModalComponent, {
      width: '60vw',
      maxWidth: '95vw',
      data: { idParametrosFacturacionNotarias },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBillingParametersNotaries(this.idNotary);
    });
  }

  onEdit(element: ParametrosFacturacionNotarias) {
    console.log('Editar elemento:', element);
    // Aquí puedes agregar la lógica para editar el elemento
  }

  onDownloadLogo(element: ParametrosFacturacionNotarias) {
    let tipoArchivo = 'pdf';
    let nombreSistema = 'notarial';
    let fileName = element.nombreLogo ? element.nombreLogo : 'logo_notarial.png';

    this.repositorioService.downloadFile(element.logoEmisor, tipoArchivo, nombreSistema).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Error al descargar el archivo', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

}
