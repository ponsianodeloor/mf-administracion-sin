import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParametrosFacturacionNotarias } from '../../features/parametros-facturacion-notarias/api/ParametrosFacturacionNotarias';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TableSearchPaginated, TableSearchPaginatedResponse } from '../components/tabla-search/table';

@Injectable({
  providedIn: 'root'
})
export class AdminParametrosFacturacionNotariaService {

  private readonly url = environment.HOST_API_TELEMATICO+environment.ADMIN_PARAMETROS_FACTURACION_NOTARIA;

  constructor(private readonly http: HttpClient) { }

  getParametrosFacturacion(params: TableSearchPaginated): Observable<TableSearchPaginatedResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('per_page', params.pageSize.toString())
      .set('sort_by', params.sortBy || '')
      .set('sort_direction', params.sortDirection || '');

    Object.entries(params.searchQuery || {}).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value as string);
    });
    return this.http.get<TableSearchPaginatedResponse>(`${this.url}`, { params: httpParams });
  }

  getParametroFacturacion(id: number): Observable<ParametrosFacturacionNotarias> {
    return this.http.get<ParametrosFacturacionNotarias>(`${this.url}/show/${id}`);
  }

  createParametroFacturacion(parametro: ParametrosFacturacionNotarias): Observable<ParametrosFacturacionNotarias> {
    return this.http.post<ParametrosFacturacionNotarias>(`${this.url}/store`, parametro);
  }

  updateEstadoParametroFacturacion(parametro: ParametrosFacturacionNotarias): Observable<ParametrosFacturacionNotarias> {
    return this.http.post<ParametrosFacturacionNotarias>(`${this.url}/update-estado`, parametro);
  }

}
