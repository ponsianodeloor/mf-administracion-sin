import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";
import {PersonalPesnotService} from "../../../services/personal-pesnot.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonRol} from "../../../interfaces/person-rol";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-search-participant-modal',
  standalone: true,
  imports: [
    ShellMaterialModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './search-participant-modal.component.html',
  styleUrl: './search-participant-modal.component.scss'
})
export class SearchParticipantModalComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['apellidosNombres', 'select'];
  dataSource: PersonRol[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SearchParticipantModalComponent>,
    private readonly personalPesnotService: PersonalPesnotService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }

  onSearch() {
    const searchValue = this.searchForm.get('search')?.value;
    this.getPersonaRolSearch(searchValue);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getPersonaRolSearch(search: string) {
    this.personalPesnotService.getPersonaRolSearch(search).subscribe({
      next: (data) => {
        this.dataSource = data; // Asigna los datos obtenidos al dataSource
      },
      error: (err) => {
        console.error('Error al buscar:', err);
      }
    });
  }

  onSelectParticipant(participant: PersonRol): void {
    // Lógica adicional para manejar la selección
    this.dialogRef.close(participant); // Cierra el modal y devuelve el participante seleccionado
  }

}
