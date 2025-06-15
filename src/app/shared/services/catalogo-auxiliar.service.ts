import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CatalogoAuxiliar } from '../api/catalogoAuxiliar';

@Injectable({
  providedIn: 'root'
})
export class CatalogoAuxiliarService {

  private readonly API_URL = environment.HOST_API_TELEMATICO + environment.ADMINISTRACION_CATALOGO_AUXILIAR_API_SERVICES;

  constructor(private http: HttpClient) { }

  getByNemonico(nemonico: string): Observable<CatalogoAuxiliar> {
    return this.http.get<CatalogoAuxiliar>(`${this.API_URL}/byNemonico/${nemonico}`);
  }

  getByCatalogoPadre(idCatalogoPadre: number): Observable<CatalogoAuxiliar> {
    return this.http.get<CatalogoAuxiliar>(`${this.API_URL}/byIdCatalogoPadre/${idCatalogoPadre}`);
  }

  getByNemonicoPadre(nemonicoPadre: string): Observable<CatalogoAuxiliar[]> {
    return this.http.get<CatalogoAuxiliar[]>(`${this.API_URL}/by-nemonico-padre/${nemonicoPadre}`);
  }

  getById(id: number): Observable<CatalogoAuxiliar> {
    return this.http.get<CatalogoAuxiliar>(`${this.API_URL}/by-id/${id}`);
  }

  getIndexPaginated(): Observable<CatalogoAuxiliar[]> {
    return this.http.get<CatalogoAuxiliar[]>(`${this.API_URL}/indexPaginated`);
  }

  getTree(): Observable<CatalogoAuxiliar[]> {
    return this.http.get<CatalogoAuxiliar[]>(`${this.API_URL}/catalogo-auxiliar-tree`);
  }

  store(data: CatalogoAuxiliar): Observable<CatalogoAuxiliar> {
    return this.http.post<CatalogoAuxiliar> (`${this.API_URL}`, data);
  }
}
