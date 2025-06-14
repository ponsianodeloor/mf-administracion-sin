import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import { MatIconModule } from '@angular/material/icon';

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
  tipos = ['Taller', 'Seminario', 'Curso', 'Webinar'];
  asistencias = ['Presencial', 'Virtual', 'Mixta'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormCapacitacionComponent>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es-MX');
  }

  ngOnInit(): void {
    this.formCapacitacion = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      asistencia: ['', Validators.required],
      lugar: ['']
    });
  }

  onSubmit() {
    if (this.formCapacitacion.valid) {
      const formValue = { ...this.formCapacitacion.value };
      // Convierte la fecha a string ISO para la base de datos
      formValue.fecha = formValue.fecha ? formValue.fecha.toISOString().split('T')[0] : null;
      // Aquí puedes enviar formValue a tu backend
    } else {
      this.formCapacitacion.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
