import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
  capacitaciones = ['Capacitacion Pesnot']; // Llena dinámicamente según tu lógica
  participantes = []; // Llena dinámicamente según tu lógica

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormCapacitacionDetalleComponent>) {}

  ngOnInit() {
    this.form = this.fb.group({
      capacitacion: [null],
      participante: [null],
      asiste: [false],
      observaciones: ['']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
