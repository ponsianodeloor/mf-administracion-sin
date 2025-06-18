import { Injectable } from '@angular/core';
import { Capacitacion } from '../../features/capacitacion/api/capacitaciones';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TableSearchPaginated, TableSearchPaginatedResponse } from '../components/tabla-search/table';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionDetalleService {

  private readonly apiUrl = environment.HOST_API_TELEMATICO + environment.ADMINISTRACION_CAPACITACION_DETALLE_API_SERVICES;

  constructor(private http: HttpClient) { }

  getDetalleAsistentes(params: TableSearchPaginated,idCapacitacion: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('per_page', params.pageSize.toString())
      .set('sort_by', params.sortBy || '')
      .set('sort_direction', params.sortDirection || '')
      .set('id_capacitacion', idCapacitacion.toString());

    return this.http.get<any>(`${this.apiUrl}/all-vs-detalle-capacitacion`, { params });
  }
}
