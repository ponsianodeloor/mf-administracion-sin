import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgForOf, NgIf } from '@angular/common';
import {ShellMaterialModule} from "../../../../../shared/modules/shell-material.module";

@Component({
  selector: 'app-edit-zoom-parameters',
  standalone: true,
  imports: [
    MatIconModule,
    ShellMaterialModule,
    MatSnackBarModule,
    ClipboardModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './edit-zoom-parameters.component.html',
  styleUrl: './edit-zoom-parameters.component.scss'
})
export class EditZoomParametersComponent {

  zoomParameters = [
    { label: 'ZOOM_CLIENT_ID', value: '4q4nutiCRC6BpFL3b5qwg', hidden: false, canToggle: false },
    { label: 'ZOOM_CLIENT_SECRET', value: 'secret-client', hidden: true, canToggle: true },
    { label: 'ZOOM_ACCOUNT_ID', value: 'YUGAVZQnSdWSD82yY05Odw', hidden: false, canToggle: false },
    { label: 'ZOOM_BASE_URL', value: 'https://api.zoom.us/v2', hidden: false, canToggle: false },
    { label: 'ZOOM_SDK_KEY', value: '487pnb97QNGSMdo1eM5m9A', hidden: false, canToggle: false },
    { label: 'ZOOM_SDK_SECRET', value: 'sdk-secret', hidden: true, canToggle: true },
    { label: 'ZOOM_API_USER_ID', value: 'anthony.espinozaf@gmail.com', hidden: false, canToggle: false },
    { label: 'ZOOM_TOKEN_SECRET', value: 'token-secret', hidden: true, canToggle: true },
    { label: 'ZOOM_TOKEN_VERIFY', value: 'zMkpR0Z1TsaZYLlURldk0g', hidden: false, canToggle: false },
  ];

  constructor(
    private readonly clipboard: Clipboard,
    private readonly snackBar: MatSnackBar
  ) {}

  copyToClipboard(param: any): void {
    this.clipboard.copy(param.value);
    this.snackBar.open(`${param.label} copiado`, 'Cerrar', {
      duration: 2000,
    });
  }

}
