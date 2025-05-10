import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminCatalogoService {

  private nemonicoPadre = environment.AdministracionCatalogonemonicoPadre;
  private url = environment.ADMINISTRACION_CATALOGO_API_SERVICES;

  constructor(
    private http: HttpClient
  ) { }

  getPesnotCatCatalogoByNemonicoPadre(nemonicoPadre: string) {
    return this.http.get(`${this.url}/pesnot-cat-catalogo/${nemonicoPadre}`);
  }

  getPesnotCatCatalogoByNemonicoPadreTree(nemonicoPadre: string) {
    return this.http.get(`${this.url}/pesnot-cat-catalogo/tree/${nemonicoPadre}`);
  }
}
