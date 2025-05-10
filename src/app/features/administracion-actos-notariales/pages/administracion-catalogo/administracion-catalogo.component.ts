import { Component, OnInit, OnDestroy, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-administracion-catalogo',
  templateUrl: './administracion-catalogo.component.html',
  styleUrl: './administracion-catalogo.component.scss'
})
export class AdministracionCatalogoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  nemonicoPadre = environment.AdministracionCatalogonemonicoPadre;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      document: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.get('category')?.setValue(this.nemonicoPadre);
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  clearForm() {
    this.form.reset();
  }

  onSubmit() {}

}
