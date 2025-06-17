import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";

@Component({
  selector: 'app-search-participant-modal',
  standalone: true,
  imports: [
    ShellMaterialModule
  ],
  templateUrl: './search-participant-modal.component.html',
  styleUrl: './search-participant-modal.component.scss'
})
export class SearchParticipantModalComponent {

  constructor(
    private dialogRef: MatDialogRef<SearchParticipantModalComponent>,
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

}
