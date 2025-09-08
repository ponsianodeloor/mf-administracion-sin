import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { from, switchMap } from 'rxjs';
import {encryptWithPublicKey} from "../utils/crypto.util";

@Injectable({
  providedIn: 'root'
})
export class SeguridadParametrosService {

  private dashboardPesnot = environment.DASHBOARD_PESNOT;
  private apiSeguridadParametros = environment.SEGURIDAD_PARAMETROS;
  private epUploadP12 = environment.EP_UPLOAD_P12;
  private epGuardarClaveP12 = environment.EP_GUARDAR_CLAVE_P12;

  constructor(
    private http: HttpClient,
  ) { }

  uploadP12(id: number, file: File) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('file', file);

    return this.http.post(`${this.dashboardPesnot}${this.apiSeguridadParametros}${this.epUploadP12}`, formData);
  }

  savePasswordP12(id: number, clave: string) {
    return from(encryptWithPublicKey(clave)).pipe(
      switchMap((encryptedClave) => {
        const body = { id, encrypted: encryptedClave };
        return this.http.post(
          `${this.dashboardPesnot}${this.apiSeguridadParametros}${this.epGuardarClaveP12}`,
          body
        );
      })
    );
  }
}
