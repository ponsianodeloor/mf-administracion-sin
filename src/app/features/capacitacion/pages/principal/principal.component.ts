import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormCapacitacionDetalleComponent } from '../../components/form-capacitacion-detalle/form-capacitacion-detalle.component';
import { FormCapacitacionComponent } from '../../components/form-capacitacion/form-capacitacion.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { Capacitacion } from '../../api/capacitaciones';
import { CapacitacionService } from '../../../../shared/services/capacitacion.service';
import { CatalogoAuxiliarService } from '../../../../shared/services/catalogo-auxiliar.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit, OnDestroy {

  breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/home', active: false },
    { name: 'Capacitaciones', url: '/capacitaciones', active: true },
  ];

  capacitaciones!: Capacitacion[];
  capacitacionSeleccionada: Capacitacion | null = null;

  constructor(public dialog: MatDialog, private capacitacionService: CapacitacionService, private catalogoAuxiliarService: CatalogoAuxiliarService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {}

  getData() {
    this.capacitacionService.getAll().subscribe((capacitaciones: Capacitacion[]) => {
      this.capacitaciones = capacitaciones;
    });
  }

  openDialogCapacitacion() {
    const dialogRef = this.dialog.open(FormCapacitacionComponent, {
      height: '85%',
      width: '40%',
      position: {
        right: '0',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  openNodeSelected(node: Capacitacion) {
    this.capacitacionSeleccionada = node;
  }
}
