import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeguridadParametrosService {

  private dashboardPesnot = environment.DASHBOARD_PESNOT;
  private apiSeguridadParametros = environment.SEGURIDAD_PARAMETROS;
  private epUploadP12 = environment.EP_UPLOAD_P12;

  constructor(
    private http: HttpClient,
  ) { }

  uploadP12(id: number, file: File) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('file', file);

    return this.http.post(`${this.dashboardPesnot}${this.apiSeguridadParametros}${this.epUploadP12}`, formData);
  }
}
