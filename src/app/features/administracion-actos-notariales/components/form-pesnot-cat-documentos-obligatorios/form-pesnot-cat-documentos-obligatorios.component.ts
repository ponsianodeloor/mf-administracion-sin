import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { DocumentosObligatorios } from '../../api/catalogo';
import { NodeSelectionService } from '../../services/node-selection.service';

@Component({
  selector: 'app-form-pesnot-cat-documentos-obligatorios',
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
  templateUrl: './form-pesnot-cat-documentos-obligatorios.component.html',
  styleUrl: './form-pesnot-cat-documentos-obligatorios.component.scss'
})
export class FormPesnotCatDocumentosObligatoriosComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  editSave = false;
  documentosObligatorios!: DocumentosObligatorios;

  constructor(private formBuilder: FormBuilder, private nodeSelectionService: NodeSelectionService) {
    this.documentosObligatorios = {
      idCatalogo: 0,
      nombreArchivo: '',
      extensionArchivo: '',
      tipoArchivo: '',
      requiereFirmaNotario: 'N',
      isCedula: 'N',
      requiereFirma: 'N'
    };
  }

  ngOnInit(): void {
    this.setupCheckboxLogic();
    this.nodeSelectionService.selectedNode$.subscribe((node) => {
      this.documentosObligatorios = {
        ...node,
        requiereFirmaNotario: node.requiereFirmaNotario,
        requiereFirma: node.requiereFirma,
        isCedula: node.isCedula
      };
      this.initForm();
    });
  }

  ngOnDestroy(): void {}

  private initForm(): void {
    this.form = this.formBuilder.group({
      nombreArchivo: [this.documentosObligatorios.nombreArchivo, Validators.required],
      tipoArchivo: [this.documentosObligatorios.tipoArchivo, Validators.required],
      requiereFirmaNotario: [this.documentosObligatorios.requiereFirmaNotario == 'S' ? true : false],
      requiereFirma: [this.documentosObligatorios.requiereFirma == 'S' ? true : false],
      isCedula: [this.documentosObligatorios.isCedula == 'S' ? true : false]
    });
    this.form.disable();
  }

  private setupCheckboxLogic(): void {
    this.form.get('requiereFirmaNotario')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('requiereFirma')?.setValue(true);
        this.form.get('requiereFirma')?.disable();
      } else {
        this.form.get('requiereFirma')?.enable();
      }
    });
  }

  onNew(): void {
    this.editSave = true;
    this.form.reset();
    this.form.enable();
  }

  onEdit(): void {
    this.editSave = true;
    this.form.enable();
  }

  onCancel(): void {
    this.editSave = false;
    this.form.reset();
    this.form.disable();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.editSave = false;
      this.form.disable();
    }
  }
}
