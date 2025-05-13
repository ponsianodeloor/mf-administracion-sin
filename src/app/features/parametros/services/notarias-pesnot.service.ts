import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ParametrosNotarias} from "../interfaces/parametros-notarias";

@Injectable({
  providedIn: 'root'
})
export class NotariasPesnotService {

  serverPesnot = environment.SERVER_PESNOT;
  msNotariasPesnotService = environment.MS_NOTARIAS_PESNOT_SERVICE;
  endpointGetParametersNotaries = environment.ENDPOINT_GET_PARAMETERS_NOTARIES;

  constructor(
    private readonly http: HttpClient,
  ) { }

  getParametersNotaries(codigo: string, idNotaria: number): Observable<ParametrosNotarias[]> {
    return this.http.get<ParametrosNotarias[]>(
      `${this.serverPesnot}${this.msNotariasPesnotService}${this.endpointGetParametersNotaries}${codigo}?idNotaria=${idNotaria}`
    );
  }
}
