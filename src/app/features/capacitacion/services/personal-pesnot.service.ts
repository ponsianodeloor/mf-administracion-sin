import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PersonRol} from "../interfaces/person-rol";

@Injectable({
  providedIn: 'root'
})
export class PersonalPesnotService {

  apiTelematico = environment.HOST_API_TELEMATICO;
  msPersonalPesnotService = environment.MS_PERSONAL_PESNOT_SERVICE;
  endpointGetPersonaRolSearch = environment.ENDPOINT_GET_PERSONA_ROL_SEARCH;

  constructor(
    private http: HttpClient,
  ) { }

  getPersonaRolSearch(search: string): Observable<PersonRol[]> {
    return this.http.get<any>(`${this.apiTelematico}${this.msPersonalPesnotService}${this.endpointGetPersonaRolSearch}${search}`)
      .pipe(
        map(response => response.data) // Extrae solo el array de objetos dentro de "data"
      );
  }
}
