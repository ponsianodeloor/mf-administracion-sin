import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionDetalleService {

  private readonly apiUrl = environment.HOST_API_TELEMATICO + environment.ADMINISTRACION_CAPACITACION_DETALLE_API_SERVICES;

  constructor(private http: HttpClient) { }

  getDetalleAsistentes(
    idCapacitacion: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('idCapacitacion', idCapacitacion.toString());

    return this.http.get<any>(`${this.apiUrl}/all-vs-detalle-capacitacion`, { params });
  }
}
