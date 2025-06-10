import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { FileStore } from '../../shared/components/file-upload/files';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {

  private apiUrl = environment.SERVER_PESNOT + environment.REPOSITORIO_SERVICE;
  private apiUrlParams = environment.SERVER_PESNOT + environment.NOTARIAS_SERVICE_PESNOT;

  constructor(private http: HttpClient) { }

  getFileSolicitud(
    idArchivo: string,
  ): Observable<any> {
    const url = `${this.apiUrl}/repositorio-service/repositorio-service-query/buscarArchivoServidor`;
    const params = new HttpParams()
      .set('idArchivo', idArchivo)
      .set('tipoArchivo', 'pdf')
      .set('nombreSistema', 'notarial');
    return this.http.get(url, { params, responseType: 'blob' });
  }

  storeFileSolicitud(file: File): Observable<string> {
    const url = `${this.apiUrl}/repositorio-service/repositorio-service-command/guardarArchivoServidor`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('tipoArchivo', 'pdf');
    formData.append('nombreSistema', 'notarial');
    const headers = new HttpHeaders({ Accept: 'text/plain' });
    console.log(file);
    return this.http
      .post(url, formData, { headers, responseType: 'text' })
      .pipe(map((response) => response));
  }

  paramsFileStore(): Observable<any> {
    const url = `${this.apiUrlParams}/pesnot/query/parametros_sistema/codigo/TAMANO_MAXIMO_PERMITIDO`;
    return this.http.get(url, { responseType: 'json' });
  }

  buscarArchivoServidor(
    idArchivo: string,
    tipoArchivo: string,
    nombreSistema: string
  ): Observable<any> {
    const url = `${this.apiUrl}/repositorio-service-query/buscarArchivoServidor`;
    const params = new HttpParams()
      .set('idArchivo', idArchivo)
      .set('tipoArchivo', tipoArchivo)
      .set('nombreSistema', nombreSistema);
    return this.http.get(url, { params, responseType: 'blob' });
  }

  subirArchivoMongo(file: File): Observable<string> {
    const url = `${this.apiUrl}/repositorio-service/repositorio-service-command/guardarArchivoServidor`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('tipoArchivo', 'pdf');
    formData.append('nombreSistema', 'notarial');
    const headers = new HttpHeaders({ Accept: 'text/plain' });
    return this.http
      .post(url, formData, { headers, responseType: 'text' })
      .pipe(map((response) => response));
  }
}
