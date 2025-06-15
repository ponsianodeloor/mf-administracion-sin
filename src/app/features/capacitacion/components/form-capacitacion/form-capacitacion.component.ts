import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment';
import { CatalogoAuxiliarService } from '../../../../shared/services/catalogo-auxiliar.service';
import { CatalogoAuxiliar } from '../../../../shared/api/catalogoAuxiliar';
import { Capacitacion } from '../../api/capacitaciones';
import { CapacitacionService } from '../../../../shared/services/capacitacion.service';

registerLocaleData(localeEsMx);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-form-capacitacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './form-capacitacion.component.html',
  styleUrl: './form-capacitacion.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class FormCapacitacionComponent implements OnInit {
    
  formCapacitacion: FormGroup;
  ENV_TIPOS_CAPACITACION = environment.CAPACITACION_NEMONICOPADRE_TIPO_CAPACITACION;
  ENV_TIPOS_ASISTENCIA = environment.CAPACITACION_NEMONICOPADRE_TIPO_ASISTENCIA;
  tiposCapacitacion: CatalogoAuxiliar[] = [];
  tiposAsistencia: CatalogoAuxiliar[] = [];
  MIN_DATE = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  MIN_DURACION = 30;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormCapacitacionComponent>,
    private dateAdapter: DateAdapter<Date>,
    private catalogoAuxiliarService: CatalogoAuxiliarService,
    private capacitacionService: CapacitacionService,
    @Inject(MAT_DIALOG_DATA) public data: Capacitacion
  ) {
    this.dateAdapter.setLocale('es-MX');
  }

  ngOnInit(): void {
    this.formCapacitacion = this.fb.group({
      nombreCapacitacion: ['', Validators.required],
      fechaCapacitacion: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(this.MIN_DURACION)]],
      tipoCapacitacion: ['', Validators.required],
      tipoAsistencia: ['', Validators.required],
      lugarCapacitacion: ['']
    });
    this.catalogoAuxiliarService.getByNemonicoPadre(this.ENV_TIPOS_CAPACITACION).subscribe((res: CatalogoAuxiliar[]) => {
      this.tiposCapacitacion = res;
    });
    this.catalogoAuxiliarService.getByNemonicoPadre(this.ENV_TIPOS_ASISTENCIA).subscribe((res: CatalogoAuxiliar[]) => {
      this.tiposAsistencia = res;
    });

    if (this.data) {
      this.formCapacitacion.patchValue({
        nombreCapacitacion: this.data.nombreCapacitacion,
        fechaCapacitacion: new Date(this.data.fechaCapacitacion.toString().split('T')[0] + 'T00:00:00'),
        duracion: this.data.duracion,
        tipoCapacitacion: Number(this.data.tipoCapacitacion),
        tipoAsistencia: Number(this.data.tipoAsistencia),
        lugarCapacitacion: this.data.lugarCapacitacion
      });
    }
  }

  onSubmit() {
    if (this.formCapacitacion.valid) {
      this.formCapacitacion.markAllAsTouched();
      let formValue: Capacitacion = { ...this.formCapacitacion.value };
      formValue.fechaCapacitacion = this.formCapacitacion.get('fechaCapacitacion')?.value ? this.formCapacitacion.get('fechaCapacitacion')?.value.toISOString().split('T')[0] : null;
      this.capacitacionService.store(formValue).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    this.capacitacionService.delete(this.data.id).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      }
    });
  }
}
