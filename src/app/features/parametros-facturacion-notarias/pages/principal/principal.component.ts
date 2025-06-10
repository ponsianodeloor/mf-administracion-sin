import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { ColumnDefinition, TableSearchPaginated } from '../../../../shared/components/tabla-search/table';
import { FormParametrosFacturacionComponent } from '../../components/form-parametros-facturacion/form-parametros-facturacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminParametrosFacturacionNotariaService } from '../../../../shared/services/admin-parametros-facturacion-notaria.service';
import { ParametrosFacturacionNotarias } from '../../api/ParametrosFacturacionNotarias';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit, OnDestroy {
  breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'home',
      url: '/home',
      active: false
    },
    {
      name: 'Parámetros Facturación',
      url: '/facturacion-notarias',
      active: true
    }
  ];
  idNotaria: number = 0;
  tableParams!: TableSearchPaginated;
  data: ParametrosFacturacionNotarias[] = [];
  dataFacturacion!: ParametrosFacturacionNotarias;

  displayedColumns: ColumnDefinition[] = [
    { name: 'numeroRuc', header: 'RUC', type: 'string' },
    { name: 'tipoAmbiente', header: 'Tipo Ambiente', type: 'string' },
    { name: 'establecimiento', header: 'Establecimiento', type: 'string' },
    { name: 'puntoEmision', header: 'Punto Emisión', type: 'string' },
    { name: 'razonSocial', header: 'Razón Social', type: 'string' },
    { name: 'codigoContribuyenteEspecial', header: 'Código Contribuyente Especial', type: 'string' },
    { name: 'obligadoContabilidad', header: 'Obligado Contabilidad', type: 'string' },
    { name: 'logoEmision', header: 'Logo Emisión', type: 'string' }
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly adminParametrosFacturacionNotariaService: AdminParametrosFacturacionNotariaService
  ) { }

  ngOnInit(): void {
    this.idNotaria = JSON.parse(localStorage.getItem('userSelected')).idNotaria;
    this.tableParams = {
      page: 1,
      pageSize: 5,
      searchQuery: { idNotaria: this.idNotaria.toString() },
      sortBy: 'id',
      sortDirection: 'DESC',
      filterOptions: [],
      filterTableColumns: ['tipoSolicitud', 'estadoSolicitud'],
      totalElements: 0,
      pageIndex: 0,
      from: 0,
      to: 0,
    };
    this.getData();
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  getData() {
    this.adminParametrosFacturacionNotariaService.getParametrosFacturacion(this.tableParams).subscribe((res) => {
      if(res){
        this.data = res.data;
        if(this.data.length > 0){
          this.dataFacturacion = this.data[0];
        }
      }
    });
  }

  onPageChange(updatedParams: TableSearchPaginated) {
    this.tableParams = { ...updatedParams };
    this.getData();
  }

  onSelectRow(event: any) {
    console.log(event);
    this.openDialog(event);
  }

  onSearchEvent(updatedParams: TableSearchPaginated) {
    this.tableParams = { ...updatedParams };
    this.getData();
  }

  openDialog(event: any) {
    const dialogRef = this.dialog.open(FormParametrosFacturacionComponent, {
      data: event,
      width: '50dvw',
      height: '85%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){

      }
    });
  }
}
