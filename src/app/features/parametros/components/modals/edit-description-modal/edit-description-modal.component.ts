import {Component, OnInit} from '@angular/core';
import { Inject } from '@angular/core';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EditZoomParametersComponent} from "../../cards/edit-zoom-parameters/edit-zoom-parameters.component";
import {PesnotResumenService} from "../../../services/pesnot-resumen.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-description-modal',
  standalone: true,
  imports: [
    ShellMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-description-modal.component.html',
  styleUrl: './edit-description-modal.component.scss'
})
export class EditDescriptionModalComponent implements OnInit {

  zoomForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditZoomParametersComponent>,
    private pesnotResumenService: PesnotResumenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.zoomForm = this.fb.group({
      descripcion: [{ value: this.data.param.label, disabled: true }],
      valor: [this.data.param.value, Validators.required]
    });
  }

  updateDescription() {
    this.pesnotResumenService.updateDescriptionParameterNotaries({
      id: this.data.param.id,
      descripcion: this.zoomForm.get('valor')?.value
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
    if (this.zoomForm.valid) {
      this.updateDescription();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
