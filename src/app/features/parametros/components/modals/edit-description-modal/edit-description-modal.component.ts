import {Component, OnInit} from '@angular/core';
import { Inject } from '@angular/core';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EditZoomParametersComponent} from "../../cards/edit-zoom-parameters/edit-zoom-parameters.component";

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
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditZoomParametersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.zoomForm = this.fb.group({
      descripcion: [{ value: this.data.param.label, disabled: true }],
      valor: [this.data.param.value, Validators.required]
    });
  }

  onSubmit() {
    if (this.zoomForm.valid) {
      this.dialogRef.close(this.zoomForm.getRawValue());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
