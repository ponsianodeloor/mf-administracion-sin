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

  @Input() nemonicoPadre: string = '';
  @Output() save = new EventEmitter<Catalogo>();
  form: FormGroup = new FormGroup({});
  catalogo!: Catalogo;

  constructor(
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.catalogo = {
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
    if(!this.data) {
      this.InicializarFormulario();
    } else {
      this.catalogo = {
        ...this.data.catalogo,
      }
      this.form.patchValue(
        {
          nombre: this.catalogo.nombre,
          urlNotarias: this.catalogo.urlNotarias,
        }
      );
    }
  }

  ngOnDestroy(): void {}

  InicializarFormulario() {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      urlNotarias: [null, Validators.required],
    });
  }

  guardar() {
    if(this.form.valid) {
      this.catalogo.nombre = this.form.value.nombre;
      this.catalogo.urlNotarias = this.form.value.urlNotarias;
      this.save.emit(this.catalogo);
    }
    console.log(this.catalogo);
  }
}
