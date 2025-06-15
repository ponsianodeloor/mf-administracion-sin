import { Injectable } from '@angular/core';
import { Capacitacion } from '../../features/capacitacion/api/capacitaciones';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  private readonly API_URL = environment.HOST_API_TELEMATICO + environment.ADMINISTRACION_CAPACITACION_API_SERVICES;

  constructor(private http: HttpClient) { }

  getAll(search?: string): Observable<Capacitacion[]> {
    if (search != null && search != '') {
      const httpParams = new HttpParams().set('search', search);
      return this.http.get<Capacitacion[]>(`${this.API_URL}/all`, { params: httpParams });
    }
    return this.http.get<Capacitacion[]>(`${this.API_URL}/all`);
  }

  getPaginated(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/indexPaginated`);
  }

  getById(id: number): Observable<Capacitacion> {
    return this.http.get<Capacitacion>(`${this.API_URL}/by-id/${id}`);
  }

  store(capacitacion: Capacitacion): Observable<Capacitacion> {
    return this.http.post<Capacitacion>(`${this.API_URL}/store`, capacitacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
