import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { ColumnDefinition, TableSearchPaginated } from '../../../../shared/components/tabla-search/table';
import { FormParametrosFacturacionComponent } from '../../components/form-parametros-facturacion/form-parametros-facturacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminParametrosFacturacionNotariaService } from '../../../../shared/services/admin-parametros-facturacion-notaria.service';
import { ParametrosFacturacionNotarias } from '../../api/ParametrosFacturacionNotarias';
import { forkJoin } from 'rxjs';
import { ParametrosSistemaPesnotService } from '../../../../shared/services/parametros-sistema-pesnot.service';
import { environment } from '../../../../../environments/environment';

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
  data!: ParametrosFacturacionNotarias;
  dataSource: any[]=[];

  displayedColumns: ColumnDefinition[] = [
    { name: 'NumeroRuc', header: 'RUC', type: 'string' },
    { name: 'TipoAmbiente', header: 'Tipo Ambiente', type: 'string' },
    { name: 'Establecimiento', header: 'Establecimiento', type: 'string' },
    { name: 'PuntoEmision', header: 'Punto Emisión', type: 'string' },
    { name: 'Razonsocial', header: 'Razón Social', type: 'string' },
    { name: 'CodigoContribuyenteEspecial', header: 'Código Contribuyente Especial', type: 'string' },
    { name: 'ObligadoContabilidad', header: 'Obligado Contabilidad', type: 'string' },
    { name: 'nombreLogo', header: 'Logo Emisor', type: 'string' }
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly adminParametrosFacturacionNotariaService: AdminParametrosFacturacionNotariaService,
    private readonly parametrosSistemaPesnotService: ParametrosSistemaPesnotService
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
    forkJoin([
      this.adminParametrosFacturacionNotariaService.getParametrosFacturacion(this.tableParams),
      this.parametrosSistemaPesnotService.getAllWithFilters({
        descripcion: environment.ParametrosSistemaPesnotTipoAmbiente
      })
    ]).subscribe(([res, tiposAmbiente]) => {
      console.log(res);
      console.log(tiposAmbiente);
      if(res){
        this.dataSource = res.data;
        if(res.data.length > 0){
          this.data = res.data[0];
          this.data.TipoAmbiente = tiposAmbiente.find((tipo: any) => tipo.id == this.data.TipoAmbiente)?.codigo;
          console.log(this.data);
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormParametrosFacturacionComponent, {
      data: !this.data ? null : this.data,
      width: '50dvw',
      height: '85%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.adminParametrosFacturacionNotariaService.createParametroFacturacion(result).subscribe(
          {
            next: (res) => {
              this.getData();
            },
            error: (err) => {
              console.log(err);
            }
          }
        );
      }
    });
  }
}
