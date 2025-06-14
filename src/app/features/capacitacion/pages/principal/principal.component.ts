import { Component } from '@angular/core';
import { FormCapacitacionComponent } from '../../components/form-capacitacion/form-capacitacion.component';
import { FormCapacitacionDetalleComponent } from '../../components/form-capacitacion-detalle/form-capacitacion-detalle.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(FormCapacitacionDetalleComponent, {
      height: '85%',
      width: '40%',
      position: {
        right: '0',
      },
      disableClose: true
    });
  }
}
