import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormCapacitacionDetalleComponent } from '../../components/form-capacitacion-detalle/form-capacitacion-detalle.component';
import { FormCapacitacionComponent } from '../../components/form-capacitacion/form-capacitacion.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbItem } from '../../../../shared/components/breadcrums/breadcrumbItem.model';
import { Capacitacion } from '../../api/capacitaciones';
import { CapacitacionService } from '../../../../shared/services/capacitacion.service';
import { CatalogoAuxiliarService } from '../../../../shared/services/catalogo-auxiliar.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  form: FormGroup;
  search: string = '';

  constructor(public dialog: MatDialog, private capacitacionService: CapacitacionService, private catalogoAuxiliarService: CatalogoAuxiliarService, private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {}

  getData() {
    this.capacitacionService.getAll(this.search).subscribe((capacitaciones: Capacitacion[]) => {
      this.capacitaciones = capacitaciones;
    });
  }

  onSearch(){
    this.search = this.form.get('search')?.value;
    this.getData();
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

  onCapacitacionUpdated(capacitacion: Capacitacion) {
    this.capacitacionSeleccionada = capacitacion;
    this.getData();
  }
}
