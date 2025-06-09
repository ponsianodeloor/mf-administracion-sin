import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Catalogo } from '../../api/catalogo';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NodeSelectionService } from '../../services/node-selection.service';

@Component({
  selector: 'app-form-pesnot-cat-catalogo-padre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './form-pesnot-cat-catalogo-padre.component.html',
  styleUrl: './form-pesnot-cat-catalogo-padre.component.scss'
})
export class FormPesnotCatCatalogoPadreComponent implements OnInit, OnDestroy {

  @Output() save = new EventEmitter<Catalogo>();
  form: FormGroup = new FormGroup({});
  catalogo!: Catalogo;
  editSave = false;

  constructor(
    private formBuilder: FormBuilder,
    private nodeSelectionService: NodeSelectionService
  ) {
    this.catalogo = {
      idCatalogoPadre: 1,
      nemonicoPadre: '',
      nemonico: '',
      nombre: '',
      orden: null,
      visible: '',
      descripcion: '',
      descripcionPie: '',
      urlNotarias: '',
      normativaNotaria: '',
      descripcionMedio: '',
      tipoActoNotarial: '',
      isPadre: '',
      idActoSin: 0,
      idCatalogosPesnot: 0,
      numeroIntervinientes: 0,
    }
  }

  ngOnInit(): void {
    this.nodeSelectionService.selectedNode$.subscribe((node) => {
      this.catalogo = {
        ...node,
      }
      this.InicializarFormulario();
    });
  }

  ngOnDestroy(): void {}

  InicializarFormulario() {
    this.form = this.formBuilder.group({
      nombre: [this.catalogo.nombre, Validators.required],
      urlNotarias: [this.catalogo.urlNotarias, Validators.required],
    });
    this.form.disable();
  }

  onSubmit() {
    if(this.form.valid) {
      this.catalogo.nombre = this.form.value.nombre;
      this.catalogo.urlNotarias = this.form.value.urlNotarias;
      this.nodeSelectionService.emitSaveEvent(this.catalogo);
    }
  }

  onEdit() {
    this.form.enable();
    this.editSave = true;
  }

  onCancel() {
    this.form.disable();
    this.InicializarFormulario();
    this.editSave = false;
  }

  onNew() {
    this.form.reset();
    this.form.enable();
    this.editSave = true;
  }
}
