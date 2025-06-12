import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ValueParameter} from "../interfaces/value-parameter";
import {ParametrosNotarias} from "../interfaces/parametros-notarias";
import {Observable} from "rxjs";
import {DescriptionParameter} from "../interfaces/description-parameter";

@Injectable({
  providedIn: 'root'
})
export class PesnotResumenService {

  hostApiTelematico = environment.HOST_API_TELEMATICO;
  msPesnotResumenService = environment.MS_PESNOT_RESUMEN_SERVICE;
  rsParametroNotariasPesnot = environment.RS_PARAMETRO_NOTARIAS_PESNOT;
  endpointPostUpdateValueById = environment.ENDPOINT_POST_UPDATE_VALUE_BY_ID;
  endpointPostUpdateDescriptionById = environment.ENDPOINT_POST_UPDATE_DESCRIPTION_BY_ID;

  constructor(
    private http: HttpClient
  ) { }

  updateValueParameterNotaries(valueParameter: ValueParameter): Observable<ParametrosNotarias> {
    return this.http.post<ParametrosNotarias>(
      `${this.hostApiTelematico}${this.msPesnotResumenService}${this.rsParametroNotariasPesnot}${this.endpointPostUpdateValueById}`,
      valueParameter
    );
  }

  updateDescriptionParameterNotaries(descriptionParameter: DescriptionParameter): Observable<ParametrosNotarias> {
    return this.http.post<ParametrosNotarias>(
      `${this.hostApiTelematico}${this.msPesnotResumenService}${this.rsParametroNotariasPesnot}${this.endpointPostUpdateDescriptionById}`,
      descriptionParameter
    );
  }
}
