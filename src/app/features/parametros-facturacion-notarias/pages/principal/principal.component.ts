import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { ColumnDefinition, TableSearchPaginated } from '../../../../shared/components/tabla-search/table';

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
      name: 'Facturación Notarias',
      url: '/facturacion-notarias',
      active: true
    }
  ];

  tableParams!: TableSearchPaginated;

  displayedColumns: ColumnDefinition[] = [
    { name: 'acciones', header: '', type: 'action' },
    { name: 'idNotaria', header: 'Notaría', type: 'string' },
    { name: 'claveAcceso', header: 'Clave de Acceso', type: 'string' },
    { name: 'numeroRuc', header: 'RUC', type: 'string' },
    { name: 'tipoAmbiente', header: 'Tipo Ambiente', type: 'string' },
    { name: 'establecimiento', header: 'Establecimiento', type: 'string' },
    { name: 'puntoEmision', header: 'Punto Emisión', type: 'string' },
    { name: 'razonSocial', header: 'Razón Social', type: 'string' },
    { name: 'codigoContribuyenteEspecial', header: 'Código Contribuyente Especial', type: 'string' },
    { name: 'obligadoContabilidad', header: 'Obligado Contabilidad', type: 'string' },
    { name: 'logoEmision', header: 'Logo Emisión', type: 'string' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.tableParams = {
      page: 1,
      pageSize: 5,
      searchQuery: {},
      sortBy: 'id',
      sortDirection: 'DESC',
      filterOptions: [],
      filterTableColumns: ['tipoSolicitud', 'estadoSolicitud'],
      totalElements: 0,
      pageIndex: 0,
      from: 0,
      to: 0,
    };
  }

  ngOnDestroy(): void { }

  getData() {
    console.log(this.tableParams);
  }

  onPageChange(updatedParams: TableSearchPaginated) {
    this.tableParams = { ...updatedParams };
    this.getData();
  }

  onSelectRow(event: any) {
    console.log(event);
  }

  onSearchEvent(updatedParams: TableSearchPaginated) {
    this.tableParams = { ...updatedParams };
    this.getData();
  }

}
