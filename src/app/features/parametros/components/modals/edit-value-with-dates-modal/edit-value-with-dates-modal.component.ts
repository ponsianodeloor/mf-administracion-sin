import {Component, Inject, OnInit} from '@angular/core';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PesnotResumenService} from "../../../services/pesnot-resumen.service";
import {ToastrService} from "ngx-toastr";
import {EditBankParametersComponent} from "../../tables/edit-bank-parameters/edit-bank-parameters.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-value-with-dates-modal',
  standalone: true,
  imports: [
    ShellMaterialModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-value-with-dates-modal.component.html',
  styleUrl: './edit-value-with-dates-modal.component.scss'
})
export class EditValueWithDatesModalComponent implements OnInit {

  bankForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBankParametersComponent>,
    private pesnotResumenService: PesnotResumenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bankForm = this.fb.group({
      descripcion: [{ value: this.data.param.label, disabled: true }],
      valor: [this.data.param.value, Validators.required],
      fechaInicial: [this.data.param.fechaInicial, Validators.required],
      fechaFinal: [this.data.param.fechaFinal, Validators.required],
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(formGroup: FormGroup): ValidationErrors | null {
    const start = formGroup.get('fechaInicial')?.value;
    const end = formGroup.get('fechaFinal')?.value;
    if (start && end && start >= end) {
      formGroup.get('fechaInicial')?.setErrors({ dateRangeInvalid: true });
      formGroup.get('fechaFinal')?.setErrors({ dateRangeInvalid: true });
      return { dateRangeInvalid: true };
    }
    formGroup.get('fechaInicial')?.setErrors(null);
    formGroup.get('fechaFinal')?.setErrors(null);
    return null;
  }

  updateValue() {
    this.pesnotResumenService.updateValueParameterNotaries({
      id: this.data.param.id,
      valor: this.bankForm.get('valor')?.value,
      fechaInicial: this.bankForm.get('fechaInicial')?.value,
      fechaFinal: this.bankForm.get('fechaFinal')?.value
    }).subscribe({
      next: (response) => {
        this.toastr.success('Descripción actualizada correctamente', 'Éxito');
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.toastr.error('Error al actualizar la descripción', 'Error');
      }
    });
  }

  onSubmit() {
    if (this.bankForm.valid) {
      this.updateValue();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
