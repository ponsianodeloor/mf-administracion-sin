import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositorioService } from '../../services/repositorio.service';
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
  @Output() message = new EventEmitter<string>();
  @Input() fileName = '';
  @Input() uuidSolicitud = '';
  @Input() isOnlyView = false;
  fileInfos?: Observable<any>;
  @Output() newItemEvent = new EventEmitter<{ fileName: string, uuidSolicitud: string, mimeType: string }>();
  isDisabled = false;
  @Input() maxFileSize!: number;
  mimeType: string = '';

  // Tipos MIME permitidos para imágenes
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff'
  ];

  constructor(private repositorioService: RepositorioService) { }

  ngOnInit(): void {
    if (this.isOnlyView) {
      this.disableComponent();
    }
  }

  private disableComponent(): void {
    this.isDisabled = true;
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      dropZone.removeEventListener('dragover', this.onDragOver as EventListener);
      dropZone.removeEventListener('drop', this.onDrop as EventListener);
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
    this.message.emit("");

    // Validación del tipo MIME
    if (!this.allowedMimeTypes.includes(file.type)) {
      this.message.emit('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WEBP, BMP, TIFF)');
      this.fileName = '';
      this.uuidSolicitud = '';
      return;
    }

    if (this.maxFileSize) {
      const fileSize = file.size / (1024 * 1024); // Convert to MB
      if (fileSize >= this.maxFileSize) {
        this.message.emit('El archivo excede el tamaño máximo permitido (' + this.maxFileSize + 'MB)');
        this.fileName = '';
        this.uuidSolicitud = '';
        return;
      }
    }

    if (file.name && !file.name.includes('fakepath')) {
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.upload();
    } else {
      this.message.emit('Ruta de archivo no válida');
      this.fileName = '';
      this.uuidSolicitud = '';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.progress = 0;
      this.message.emit('Subiendo imagen...');

      this.repositorioService.storeFileSolicitud(this.currentFile).subscribe({
        next: (event: string) => {
          this.uuidSolicitud = event;
          this.mimeType = this.currentFile.type;
          this.newItemEvent.emit({
            fileName: this.fileName,
            uuidSolicitud: this.uuidSolicitud,
            mimeType: this.mimeType
          });
          this.message.emit('Imagen subida exitosamente');
        },
        error: (err: any) => {
          this.progress = 0;
          this.message.emit('No se pudo subir la imagen');
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