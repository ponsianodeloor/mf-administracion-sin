import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Capacitacion, CapacitacionDetalle } from '../../api/capacitaciones';
import {SearchParticipantModalComponent} from "../modals/search-participant-modal/search-participant-modal.component";
import {JsonPipe, NgIf} from "@angular/common";
import {PersonRol} from "../../interfaces/person-rol";
import {DetailTraining} from "../../interfaces/detail-training";

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
    MatIconModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './form-capacitacion-detalle.component.html',
  styleUrl: './form-capacitacion-detalle.component.scss'
})
export class FormCapacitacionDetalleComponent implements OnInit {
  formParticipant: FormGroup;
  capacitacion: Capacitacion;

  participantSelected: PersonRol | undefined;
  detailTraining: DetailTraining = {
    idCapacitacion: 0,
    idPersonaNotario: 0,
    isAsiste: '',
    observaciones: ''
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormCapacitacionDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.capacitacion = this.data.capacitacion;

    this.formParticipant = this.fb.group({
      capacitacion: [this.data.capacitacion.id, Validators.required],
      participante: [null, Validators.required],
      asiste: [false],
      observaciones: ['']
    });

    this.formParticipant.get('capacitacion')?.disable();

    if (this.data.detalleCapacitacion) {
      this.formParticipant.patchValue(this.data.detalleCapacitacion);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    console.log(this.data);
  }

  openSearchParticipantModal(): void {
    const dialogRef = this.dialog.open(SearchParticipantModalComponent, {
      width: '40%',
      height: '40%',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: PersonRol | undefined) => {
      if (result) {
        // Lógica cuando result es de tipo PersonRol
        this.participantSelected = result;
        this.formParticipant.patchValue({
          participante: this.participantSelected.apellidosNombres
        });

        this.detailTraining.idPersonaNotario = Number(this.participantSelected.idPersonaNotario);

      } else {
        // Lógica cuando result es undefined
        console.log('No se seleccionó ningún participante.');
      }
    });
  }

  onSubmit() {
    if( this.formParticipant.valid) {
      this.detailTraining.idCapacitacion = this.data.capacitacion.id;
      this.detailTraining.isAsiste = this.formParticipant.value.asiste ? 'S' : 'N';
      this.detailTraining.observaciones = this.formParticipant.value.observaciones;
      this.detailTraining.idPersonaNotario = this.participantSelected ? Number(this.participantSelected.idPersonaNotario) : 0;

      console.log('Detalle de capacitación:', this.detailTraining);
      //this.dialogRef.close(this.detailTraining);
    }
  }

  onSelectRow(row: any) {
    console.log(row);
  }
}
