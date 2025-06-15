import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Capacitacion, CapacitacionDetalle } from '../../api/capacitaciones';

@Component({
  selector: 'app-form-capacitacion-detalle',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './form-capacitacion-detalle.component.html',
  styleUrl: './form-capacitacion-detalle.component.scss'
})
export class FormCapacitacionDetalleComponent implements OnInit {
  form: FormGroup;
  capacitacion: Capacitacion;
  participantes: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<FormCapacitacionDetalleComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.capacitacion = this.data.capacitacion;

    this.form = this.fb.group({
      capacitacion: [this.data.capacitacion.id, Validators.required],
      participante: [null, Validators.required],
      asiste: [false],
      observaciones: ['']
    });

    this.form.get('capacitacion')?.disable();

    if (this.data.detalleCapacitacion) {
      this.form.patchValue(this.data.detalleCapacitacion);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    console.log(this.data);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onSelectRow(row: any) {
    console.log(row);
  }
}
