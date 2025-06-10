import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosSistemaPesnotService {

  private url = environment.HOST_API_TELEMATICO + environment.MS_PARAMETROS_SISTEMAS_PESNOT;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  getAllWithFilters(filters: any): Observable<any> {
    return this.http.get(`${this.url}/all-with-filters`, { params: filters });
  }

  getPaginated(params: any): Observable<any> {
    return this.http.get(`${this.url}/indexPaginated`, { params });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/by-id/${id}`);
  }

  store(data: any): Observable<any> {
    return this.http.post(`${this.url}/store`, data);
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
