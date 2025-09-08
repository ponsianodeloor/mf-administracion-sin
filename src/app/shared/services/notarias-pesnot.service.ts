import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  ParametrosFacturacionNotarias,
  ParametrosFacturacionNotariasValidate, ParametrosFacturacionNotariasValidated
} from "../interfaces/parametros-facturacion-notarias";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotariasPesnotService {

  private apiPesnot:string = environment.API_PESNOT;
  private msNotariasPesnotService:string = environment.MS_NOTARIAS_PESNOT_SERVICE;
  private epGetBillingParametersNotaries = environment.EP_GET_BILLING_PARAMETERS_NOTARIES;

  private epPostBillingParametersNotariesCreateOrUpdate:string =
    environment.EP_POST_BILLING_PARAMETERS_NOTARIES_CREATE_OR_UPDATE;
  private epPostBillingParametersNotariesValidateIdNotaryRucEstablishmentPointOfIssue:string =
    environment.EP_POST_BILLING_PARAMETERS_NOTARIES_VALIDATE_ID_NOTARY_RUC_ESTABLISHMENT_POINT_OF_ISSUE;

  constructor(
    private http: HttpClient,
  ) { }

  getBillingParametersNotaries(idNotary: number): Observable<ParametrosFacturacionNotarias[]>{
    return this.http.get<ParametrosFacturacionNotarias[]>(this.apiPesnot + this.msNotariasPesnotService + this.epGetBillingParametersNotaries + idNotary);
  }

  postBillingParametersNotariesCreateOrUpdate(data: ParametrosFacturacionNotarias){
    return this.http.post<ParametrosFacturacionNotarias>(this.apiPesnot + this.msNotariasPesnotService + this.epPostBillingParametersNotariesCreateOrUpdate, data);
  }

  postBillingParametersNotariesValidateIdNotaryRucEstablishmentPointOfIssue(data: ParametrosFacturacionNotariasValidate): Observable<ParametrosFacturacionNotariasValidated>{
    return this.http.post<ParametrosFacturacionNotariasValidated>(this.apiPesnot + this.msNotariasPesnotService + this.epPostBillingParametersNotariesValidateIdNotaryRucEstablishmentPointOfIssue, data);
  }
}
