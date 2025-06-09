import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { ParametrosFacturacionNotarias } from '../../api/ParametrosFacturacionNotarias';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-parametros-facturacion',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './form-parametros-facturacion.component.html',
  styleUrl: './form-parametros-facturacion.component.scss'
})
export class FormParametrosFacturacionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tiposAmbiente = [
    { value: 1, label: 'Pruebas' },
    { value: 2, label: 'Producción' }
  ];
  notarias!: any[];
  isLoading: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<FormParametrosFacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParametrosFacturacionNotarias,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      idNotaria: ['', Validators.required],
      claveAcceso: ['', [Validators.required, Validators.maxLength(300)]],
      numeroRuc: ['', [Validators.required, Validators.maxLength(15)]],
      tipoAmbiente: [''],
      establecimiento: ['', [Validators.required, Validators.maxLength(4)]],
      puntoEmision: ['', [Validators.required, Validators.maxLength(4)]],
      razonSocial: ['', [Validators.required, Validators.maxLength(300)]],
      codigoContribuyenteEspecial: ['', [Validators.maxLength(20)]],
      obligadoContabilidad: [false],
      logoEmision: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isEdit = this.data ? true : false;
    this.isNew = this.data ? false : true;
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        obligadoContabilidad: this.data.obligadoContabilidad === 'SI'
      });
    }
    this.isLoading = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        obligadoContabilidad: this.form.value.obligadoContabilidad ? 'SI' : 'NO'
      };
      this.dialogRef.close(formData);
    }
  }

  ngOnDestroy(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
