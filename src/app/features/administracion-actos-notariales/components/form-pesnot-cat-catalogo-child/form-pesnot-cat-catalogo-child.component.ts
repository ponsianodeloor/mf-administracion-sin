import { Component, OnInit, OnDestroy, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Catalogo } from '../../api/catalogo';
import { NodeSelectionService } from '../../services/node-selection.service';

interface CatalogoOption {
  value: number;
  nombre: string;
}

@Component({
  selector: 'app-form-pesnot-cat-catalogo-child',
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
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './form-pesnot-cat-catalogo-child.component.html',
  styleUrl: './form-pesnot-cat-catalogo-child.component.scss'
})
export class FormPesnotCatCatalogoChildComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  catalogo!: Catalogo;
  editSave = false;
  catalogos: CatalogoOption[] = [
    { value: 1, nombre: 'opcion1' },
    // Add more options as needed
  ];

  constructor(
    private formBuilder: FormBuilder,
    private nodeSelectionService: NodeSelectionService
  ) {
    this.catalogo = {
      id: 0,
      idCatalogoPadre: 0,
      nemonicoPadre: '',
      nemonico: '',
      nombre: '',
      orden: 0,
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
      this.initForm();
    });
  }

  ngOnDestroy(): void {}

  private initForm(): void {
    this.form = this.formBuilder.group({
      nombre: [this.catalogo.nombre, Validators.required],
      normativaNotaria: [this.catalogo.normativaNotaria, Validators.required],
      tipoActoNotarial: [this.catalogo.tipoActoNotarial, Validators.required],
      idCatalogosPesnot: [this.catalogo.idCatalogosPesnot, Validators.required],
      isPadre: [this.catalogo.isPadre=='S' ? true : false, Validators.required],
    });
    this.form.disable();
  }

  onNew(): void {
    this.editSave = true;
    this.form.reset();
  }

  onEdit(): void {
    this.editSave = true;
    this.form.enable();
  }

  onCancel(): void {
    this.editSave = false;
    this.form.reset();
    this.form.disable();
    this.initForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.catalogo.nombre = this.form.value.nombre;
      this.catalogo.normativaNotaria = this.form.value.normativaNotaria;
      this.catalogo.tipoActoNotarial = this.form.value.tipoActoNotarial;
      this.catalogo.idCatalogosPesnot = this.form.value.idCatalogosPesnot;
      this.catalogo.isPadre = this.form.value.isPadre;
      this.nodeSelectionService.emitSaveEvent(this.catalogo);
      this.editSave = false;
    }
  }
}
