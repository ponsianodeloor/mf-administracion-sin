import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ParametrosFacturacionNotarias } from '../../api/ParametrosFacturacionNotarias';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from '../../../../shared/components/file-upload-image/file-upload.component';
import { ParametrosSistemaPesnotService } from '../../../../shared/services/parametros-sistema-pesnot.service';
import { environment } from '../../../../../environments/environment';
import { NotificationsService } from '../../../../core/services/util/notifications.service';

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
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FileUploadComponent
  ],
  templateUrl: './form-parametros-facturacion.component.html',
  styleUrl: './form-parametros-facturacion.component.scss'
})
export class FormParametrosFacturacionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tiposAmbiente: any[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  idNotaria: number = 0;
  fileName: string = '';
  uuidSolicitud: string = '';
  isOnlyView: boolean = false;
  maxFileSize: number = 3;
  mimeType: string = '';
  dataSource: ParametrosFacturacionNotarias;

  constructor(
    private readonly dialogRef: MatDialogRef<FormParametrosFacturacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParametrosFacturacionNotarias,
    private fb: FormBuilder,
    private readonly parametrosSistemaPesnotService: ParametrosSistemaPesnotService,
    private readonly notificationsService: NotificationsService
  ) {
    this.form = this.fb.group({
      numeroRuc: ['', [
        Validators.required,
        Validators.maxLength(13),
        Validators.minLength(13),
        this.rucValidator()
      ]],
      tipoAmbiente: [''],
      establecimiento: ['', [Validators.required, Validators.maxLength(4)]],
      puntoEmision: ['', [Validators.required, Validators.maxLength(4)]],
      razonSocial: ['', [Validators.required, Validators.maxLength(300)]],
      codigoContribuyenteEspecial: ['', [Validators.maxLength(20)]],
      obligadoContabilidad: [false],
    });
  }

  private rucValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const lastThreeDigits = value.slice(-3);
      const validEndings = ['001', '002', '003'];

      if (!validEndings.includes(lastThreeDigits)) {
        return { invalidEnding: true };
      }

      return null;
    };
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isEdit = this.data ? true : false;
    this.idNotaria = JSON.parse(localStorage.getItem('userSelected')).idNotaria;

    this.parametrosSistemaPesnotService.getAllWithFilters({
      descripcion: environment.ParametrosSistemaPesnotTipoAmbiente
    }).subscribe((res: any) => {
      this.tiposAmbiente = res;

      if (this.data) {
        this.form.patchValue({
          numeroRuc: this.data.numeroRuc,
          tipoAmbiente: this.tiposAmbiente.find(tipo => tipo.codigo === this.data.tipoAmbiente)?.id,
          establecimiento: this.data.establecimiento,
          puntoEmision: this.data.puntoEmision,
          razonSocial: this.data.razonSocial,
          codigoContribuyenteEspecial: this.data.codigoContribuyenteEspecial,
          obligadoContabilidad: this.data.obligadoContabilidad === 'SI'
        });
        this.fileName = this.data.nombreLogo;
        this.uuidSolicitud = this.data.logoEmisor;
        this.mimeType = this.data.mimeLogo;
      } else {
        this.form.patchValue({
          tipoAmbiente: this.tiposAmbiente.find(tipo => tipo.codigo === 'Pruebas')?.id,
        });
      }
      this.isLoading = false;
    });
  }

  onFileSelected(event: any): void {
    this.fileName = event.fileName;
    this.uuidSolicitud = event.uuidSolicitud;
    this.mimeType = event.mimeType;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData: ParametrosFacturacionNotarias = {
        obligadoContabilidad: this.form.value.obligadoContabilidad ? 'SI' : 'NO',
        idNotaria: this.idNotaria,
        logoEmisor: this.uuidSolicitud,
        nombreLogo: this.fileName,
        mimeLogo: this.mimeType,
        tipoAmbiente: this.form.value.tipoAmbiente,
        numeroRuc: this.form.value.numeroRuc,
        establecimiento: this.form.value.establecimiento,
        puntoEmision: this.form.value.puntoEmision,
        razonSocial: this.form.value.razonSocial,
        codigoContribuyenteEspecial: this.form.value.codigoContribuyenteEspecial,
      };

      if (!this.data) {
        this.data = formData;
      } else {
        Object.keys(formData).forEach(key => {
          if (formData[key] !== this.data[key]) {
            this.data[key] = formData[key];
          }
        });
      }

      this.dialogRef.close(this.data);
    }
  }

  onMessage(event: any): void {
    switch (event.type) {
      case 'error':
        this.notificationsService.error(event.message);
        break;
      case 'success':
        this.notificationsService.success(event.message);
        break;
      case 'info':
        this.notificationsService.info(event.message);
        break;
      case 'warning':
        this.notificationsService.warning(event.message);
        break;
    }
  }

  onInputRuc(event: any): void {
    const value = event.target.value;
    const cleanValue = value.replace(/[^0-9]/g, '');

    let finalValue = cleanValue;
    if (finalValue.length > 13) {
      finalValue = finalValue.slice(0, 13);
    }

    this.form.get('numeroRuc')?.setValue(finalValue);
  }

  onInputEstablecimiento(event: any): void {
    const value = event.target.value;
    const cleanValue = value.replace(/[^0-9]/g, '');
    this.form.get('establecimiento')?.setValue(cleanValue);
  }

  onInputClaveAcceso(event: any): void {
    const value = event.target.value;
    const cleanValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
    this.form.get('claveAcceso')?.setValue(cleanValue);
  }

  onInputPuntoEmision(event: any): void {
    const value = event.target.value;
    const cleanValue = value.replace(/[^0-9]/g, '');
    this.form.get('puntoEmision')?.setValue(cleanValue);
  }

  onInputContribuyenteEspecial(event: any): void {
    const value = event.target.value;
    const cleanValue = value
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/['";]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    this.form.get('codigoContribuyenteEspecial')?.setValue(cleanValue);
  }

  onInputRazonSocial(event: any): void {
    const value = event.target.value;
    const cleanValue = value.replace(/[^a-zA-Z0-9\s-]/g, '');
    this.form.get('razonSocial')?.setValue(cleanValue);
  }

  ngOnDestroy(): void {
    this.isLoading = false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
