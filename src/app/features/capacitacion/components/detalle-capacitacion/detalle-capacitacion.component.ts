import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Capacitacion, CapacitacionDetalle } from '../../api/capacitaciones';
import { CapacitacionService } from '../../../../shared/services/capacitacion.service';
import { CatalogoAuxiliarService } from '../../../../shared/services/catalogo-auxiliar.service';
import { forkJoin } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormCapacitacionDetalleComponent } from '../form-capacitacion-detalle/form-capacitacion-detalle.component';
import { TablaSearchComponent } from '../../../../shared/components/tabla-search/tabla-search.component';
import { ColumnDefinition } from '../../../../shared/components/tabla-search/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormCapacitacionComponent } from '../form-capacitacion/form-capacitacion.component';

@Component({
  selector: 'app-detalle-capacitacion',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TablaSearchComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detalle-capacitacion.component.html',
  styleUrl: './detalle-capacitacion.component.scss'
})
export class DetalleCapacitacionComponent implements OnChanges, OnDestroy {
  
  @Input() capacitacion!: Capacitacion;
  dataSource!: Capacitacion[];
  capacitacionDetalle!: CapacitacionDetalle[];
  isLoading: boolean = true;
  editCapacitacion!: Capacitacion;
  @Output() capacitacionUpdated = new EventEmitter<Capacitacion>();
  displayedColumnsCapacitacion: ColumnDefinition[] = [
    { name: 'nombreCapacitacion', type: 'text', header: 'Nombre' },
    { name: 'fechaCapacitacion', type: 'date', header: 'Fecha' },
    { name: 'duracion', type: 'string', header: 'Duración' },
    { name: 'lugarCapacitacion', type: 'text', header: 'Lugar' },
    { name: 'tipoCapacitacion', type: 'text', header: 'Tipo de Capacitación' },
    { name: 'tipoAsistencia', type: 'text', header: 'Tipo de Asistencia' },
  ];

  displayedColumnsDetalle: ColumnDefinition[] = [
    { name: 'edit', type: 'action', header: '' },
    { name: 'nombre', type: 'text', header: 'Nombre' },
    { name: 'apellido', type: 'text', header: 'Apellido' },
    { name: 'email', type: 'text', header: 'Email' },
    { name: 'telefono', type: 'text', header: 'Teléfono' },
    { name: 'asistencia', type: 'text', header: 'Asistencia' },
  ];

  constructor(
    private capacitacionService: CapacitacionService, 
    private catalogoAuxiliarService: CatalogoAuxiliarService, 
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['capacitacion'] && changes['capacitacion'].currentValue) {
      this.getData();
    }
  }

  getData() {
    this.isLoading = true;
    forkJoin([
      this.catalogoAuxiliarService.getById(Number(this.capacitacion.tipoAsistencia)),
      this.catalogoAuxiliarService.getById(Number(this.capacitacion.tipoCapacitacion)),
    ]).subscribe({
      next: ([tipoAsistencia, tipoCapacitacion]) => {
        this.capacitacion.tipoCapacitacion = tipoCapacitacion.descripcion;
        this.capacitacion.tipoAsistencia = tipoAsistencia.descripcion;
        this.dataSource = [this.capacitacion];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
        this.isLoading = false;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.capacitacionDetalle = [];
  }

  openDialogCapacitacion() {
    this.capacitacionService.getById(this.capacitacion.id).subscribe((capacitacion) => {
      this.editCapacitacion = capacitacion;
      const dialogRef = this.dialog.open(FormCapacitacionComponent, {
        height: '85%',
        width: '40%',
        position: {
          right: '0',
        },
        disableClose: true,
        data: this.editCapacitacion
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getData();
        }
          this.capacitacionUpdated.emit(result);
      });
    });
  }

  openDialogCapacitacionDetalle() {
    this.dialog.open(FormCapacitacionDetalleComponent, {
      height: '85%',
      width: '40%',
      position: {
        right: '0',
      },
      disableClose: true,
      data: {
        capacitacion: this.capacitacion,
        detalleCapacitacion: !this.capacitacionDetalle ? null : this.capacitacionDetalle
      }
    });
  }
}
