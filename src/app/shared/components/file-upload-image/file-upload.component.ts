import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepositorioService } from '../../../shared/services/repositorio.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ]
})
export class FileUploadComponent implements OnInit {
  currentFile?: File;
  progress = 0;
  message = '';
  @Input() fileName = '';
  @Input() uuidSolicitud = '';
  @Input() isOnlyView = false;
  fileInfos?: Observable<any>;
  @Output() newItemEvent = new EventEmitter<{fileName: string, uuidSolicitud: string}>();
  isDisabled = false;
  maxFileSize = 15;

  constructor(private repositorioService: RepositorioService) { }

  ngOnInit(): void {
    if(this.isOnlyView){
      this.disableComponent();
    }

    this.repositorioService.paramsFileStore().subscribe((response: any) => {
      this.maxFileSize = response.valor;
    });

  }

  private disableComponent(): void {
    this.isDisabled = true;
    // Deshabilitar eventos de drag and drop
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      dropZone.removeEventListener('dragover', this.onDragOver);
      dropZone.removeEventListener('drop', this.onDrop);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.handleFile(event.target.files[0]);
    }
  }

  private handleFile(file: File): void {
    this.progress = 0;
    this.message = "";
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize >= this.maxFileSize) { // Assuming 10MB limit
      this.message = 'El archivo excede el tamaño máximo permitido (' + this.maxFileSize + 'MB)';
      this.fileName = '';
      this.uuidSolicitud = '';
      return;
    }

    if (file.name && !file.name.includes('fakepath')) {
      this.currentFile = file;
      this.fileName = this.currentFile.name;

      this.upload();
    } else {
      this.message = 'Ruta de archivo no válida';
      this.fileName = '';
      this.uuidSolicitud = '';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.progress = 0;
      this.message = 'Subiendo archivo...';

      this.repositorioService.storeFileSolicitud(this.currentFile, 'pdf', 'notarial').subscribe({
        next: (event: string) => {
          this.uuidSolicitud = event;
          this.newItemEvent.emit({
            fileName: this.fileName,
            uuidSolicitud: this.uuidSolicitud
          });
          this.message = 'Archivo subido exitosamente';
        },
        error: (err: any) => {
          this.progress = 0;
          this.message = 'No se pudo subir el archivo';
          this.fileName = '';
          this.uuidSolicitud = '';
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }
}