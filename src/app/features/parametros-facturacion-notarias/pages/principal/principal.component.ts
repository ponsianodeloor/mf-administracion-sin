import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { ColumnDefinition, TableSearchPaginated } from '../../../../shared/components/tabla-search/table';
import { FormParametrosFacturacionComponent } from '../../components/form-parametros-facturacion/form-parametros-facturacion.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminParametrosFacturacionNotariaService } from '../../../../shared/services/admin-parametros-facturacion-notaria.service';
import { ParametrosFacturacionNotarias } from '../../api/ParametrosFacturacionNotarias';
import { forkJoin } from 'rxjs';
import { ParametrosSistemaPesnotService } from '../../../../shared/services/parametros-sistema-pesnot.service';
import { RepositorioService } from '../../../../shared/services/repositorio.service';
import { environment } from '../../../../../environments/environment';
import { NotificationsService } from '../../../../core/services/util/notifications.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit, OnDestroy {
  breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'home',
      active: false
    },
    {
      name: 'Parámetros Facturación',
      active: true
    }
  ];
  idNotaria: number = 0;
  tableParams!: TableSearchPaginated;
  data!: ParametrosFacturacionNotarias;
  dataSource: any[]=[];

  displayedColumns: ColumnDefinition[] = [
    { name: 'numeroRuc', header: 'RUC', type: 'string' },
    { name: 'tipoAmbiente', header: 'Tipo Ambiente', type: 'string' },
    { name: 'establecimiento', header: 'Establecimiento', type: 'string' },
    { name: 'puntoEmision', header: 'Punto Emisión', type: 'string' },
    { name: 'razonSocial', header: 'Razón Social', type: 'string' },
    { name: 'codigoContribuyenteEspecial', header: 'Código Contribuyente Especial', type: 'string' },
    { name: 'obligadoContabilidad', header: 'Obligado a llevar Contabilidad', type: 'string' },
    { name: 'nombreLogo', header: 'Logo Emisor', type: 'string' },
    { name: 'logoEmisor', header: 'Descargar', type: 'download' }
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly adminParametrosFacturacionNotariaService: AdminParametrosFacturacionNotariaService,
    private readonly parametrosSistemaPesnotService: ParametrosSistemaPesnotService,
    private readonly repositorioService: RepositorioService,
    private readonly notificationsService: NotificationsService
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
      filterTableColumns: [],
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
      if(res){
        if(res.data.length > 0){
          this.dataSource = res.data;
          this.dataSource.forEach((item: any) => {
            item.tipoAmbiente = tiposAmbiente.find((tipo: any) => tipo.id == item.tipoAmbiente)?.codigo;
            item.obligadoContabilidad = item.obligadoContabilidad === 'SI' ? 'SI' : 'NO';
          });
          this.data = this.dataSource[0];
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormParametrosFacturacionComponent, {
      data: !this.data ? null : this.data,
      width: '50dvw',
      height: '85%',
      disableClose: true
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

  onSelectRow(row: any) {
    this.onDownloads(row.row.logoEmisor, row.row.nombreLogo);
  }

  onDownloads(uuidSolicitud: string, nombreArchivo: string) {
    if (!uuidSolicitud) {
      this.notificationsService.error('No hay un archivo disponible para descargar');
      return;
    }

    this.repositorioService
      .getFileSolicitud(uuidSolicitud)
      .subscribe((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = nombreArchivo;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      });
  }
}
