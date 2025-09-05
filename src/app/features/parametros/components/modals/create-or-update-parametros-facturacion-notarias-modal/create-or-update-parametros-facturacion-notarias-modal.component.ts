import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {ParametrosFacturacionNotarias} from "../../../../../shared/interfaces/parametros-facturacion-notarias";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NotariasPesnotService} from "../../../../../shared/services/notarias-pesnot.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-or-update-parametros-facturacion-notarias-modal',
  standalone: true,
  imports: [
    ShellMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-or-update-parametros-facturacion-notarias-modal.component.html',
  styleUrl: './create-or-update-parametros-facturacion-notarias-modal.component.scss'
})

export class CreateOrUpdateParametrosFacturacionNotariasModalComponent implements OnInit{

  parametrosFacturacionNotarias: ParametrosFacturacionNotarias = {
    idParametrosFacturacionNotarias: 0,
    idNotaria: 0,
    claveAcceso: '',
    numeroRuc: '',
    tipoAmbiente: 1,
    establecimiento: '',
    puntoEmision: '',
    razonSocial: '',
    codigoContribuyenteEspecial: '',
    obligadoContabilidad: 'NO'
  }

  form: FormGroup;

  ambientes = [
    { value: 1, label: 'Pruebas' },
    { value: 2, label: 'Producción' }
  ];

  obligadoOptions = [
    { value: 'SI', label: 'Sí' },
    { value: 'NO', label: 'No' }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateOrUpdateParametrosFacturacionNotariasModalComponent>,
    private readonly notariasPesnotService: NotariasPesnotService,
    private toastrService: ToastrService
  ) {
    // Puedes usar this.data.idNotary aquí para inicializar valores
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      estado: [false, [Validators.required]],
      // 13 dígitos y terminar en 001, 002 o 003
      numeroRuc: ['', [Validators.required, Validators.pattern(/^\d{10}(001|002|003)$/)]],
      tipoAmbiente: [null, [Validators.required]],
      // Solo 001 a 100 (tres dígitos)
      establecimiento: ['', [Validators.required, Validators.pattern(/^(00[1-9]|0[1-9]\d|100)$/), Validators.maxLength(3)]],
      puntoEmision: ['', [Validators.required, Validators.pattern(/^(00[1-9]|0[1-9]\d|100)$/), Validators.maxLength(3)]],
      razonSocial: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      codigoContribuyenteEspecial: ['', [Validators.required, Validators.maxLength(10)]],
      obligadoContabilidad: [null, [Validators.required]],
      logoEmisor: [null, [Validators.required]],
      nombreLogo: ['', [Validators.required, Validators.maxLength(100)]],
      certificadoP12: [null, [Validators.required]],
      passwordCertificado: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]]
    });
  }

  // Permitir solo números y limitar longitud según control
  onKeydownDigits(event: KeyboardEvent, controlName: 'numeroRuc' | 'establecimiento' | 'puntoEmision', maxLen: number) {
    const e = event as KeyboardEvent;
    const target = e.target as HTMLInputElement;
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'
    ];

    const isCtrlCmd = e.ctrlKey || e.metaKey;
    if (
      allowedKeys.includes(e.key) ||
      (isCtrlCmd && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
    ) {
      return; // permitir navegación/edición
    }

    // Solo dígitos 0-9
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Respetar selección (reemplazo) al contar
    const selectionLength = target.selectionEnd! - target.selectionStart!;
    const currentLength = target.value?.length || 0;
    if (selectionLength === 0 && currentLength >= maxLen) {
      e.preventDefault();
    }
  }

  onSanitizeNumeroRuc(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = (input.value || '').replace(/\D+/g, '').slice(0, 13);
    this.form.get('numeroRuc')?.setValue(digits, { emitEvent: false });
  }

  onSanitizeThreeDigits(event: Event, controlName: 'establecimiento' | 'puntoEmision') {
    const input = event.target as HTMLInputElement;
    const digits = (input.value || '').replace(/\D+/g, '').slice(0, 3);
    this.form.get(controlName)?.setValue(digits, { emitEvent: false });
  }

  onFileSelected(event: Event, controlName: 'logoEmisor' | 'certificadoP12') {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    this.form.get(controlName)?.setValue(file);
    this.form.get(controlName)?.markAsTouched();
  }

  hasError(controlName: string, error: string) {
    const ctrl = this.form.get(controlName);
    return !!ctrl && ctrl.touched && ctrl.hasError(error);
  }

  onCancel() {
    this.dialogRef.close();
  }

  createOrUpdateBillingParametersNotaries(data: ParametrosFacturacionNotarias) {
    this.notariasPesnotService.postBillingParametersNotariesCreateOrUpdate(data).subscribe({
      next: (resp) => {
        console.log('Respuesta del servidor:', resp);
        this.toastrService.success('Parámetros de facturación guardados con éxito', 'Éxito', {
          timeOut: 3000,
        });
        this.dialogRef.close(true); // Cerrar el modal y pasar true para indicar éxito
      },
      error: (err) => {
        this.toastrService.error('Error al guardar los parámetros de facturación', 'Error', {
          timeOut: 3000,
        });
        console.error('Error al enviar los datos:', err);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Formulario válido:', this.form.value);

    this.parametrosFacturacionNotarias.idNotaria = this.data.idNotary;
    this.parametrosFacturacionNotarias.claveAcceso = "no-data";
    this.parametrosFacturacionNotarias.numeroRuc = this.form.value.numeroRuc;
    this.parametrosFacturacionNotarias.tipoAmbiente = this.form.value.tipoAmbiente;
    this.parametrosFacturacionNotarias.establecimiento = this.form.value.establecimiento;
    this.parametrosFacturacionNotarias.puntoEmision = this.form.value.puntoEmision;
    this.parametrosFacturacionNotarias.razonSocial = this.form.value.razonSocial;
    this.parametrosFacturacionNotarias.codigoContribuyenteEspecial = this.form.value.codigoContribuyenteEspecial;
    this.parametrosFacturacionNotarias.obligadoContabilidad = this.form.value.obligadoContabilidad;

    this.parametrosFacturacionNotarias = this.removeIdParametrosFacturacionNotariasTemp();

    this.createOrUpdateBillingParametersNotaries(this.parametrosFacturacionNotarias);
  }

  /**
   * Elimina temporalmente la propiedad idParametrosFacturacionNotarias del objeto parametrosFacturacionNotarias.
   * Devuelve una copia del objeto sin esa propiedad.
   */
  removeIdParametrosFacturacionNotariasTemp(): Omit<ParametrosFacturacionNotarias, 'idParametrosFacturacionNotarias'> {
    const { idParametrosFacturacionNotarias, ...rest } = this.parametrosFacturacionNotarias;
    return rest;
  }
}
