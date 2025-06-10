import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminCatalogoService {

  private url = environment.HOST_API_TELEMATICO + environment.ADMINISTRACION_CATALOGO_API_SERVICES;

  constructor(
    private http: HttpClient
  ) { }

  getPesnotCatCatalogoByNemonicoTree(nemonicoPadre: string) {
    return this.http.get(`${this.url}/${nemonicoPadre}`);
  }

  getCatalogoIndexPaginated() {
    return this.http.get(`${this.url}/index-paginated`);
  }

  getCatalogoById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  getCatalogoTree(nemonico: string) {
    return this.http.get(`${this.url}/tree/${nemonico}`);
  }

  getCatalogoTreeMoreDocObligatoriosAdminActoNotariales(nemonico: string) {
    return this.http.get(`${this.url}/tree-more-doc-obligatorios-admin-acto-notariales/${nemonico}`);
  }
}
