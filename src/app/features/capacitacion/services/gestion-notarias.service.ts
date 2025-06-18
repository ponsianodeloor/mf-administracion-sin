import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DetailTraining, DetailTrainingResponse} from "../interfaces/detail-training";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestionNotariasService {

  apiTelematico = environment.HOST_API_TELEMATICO;
  msGestionNotariasService = environment.MS_GESTION_NOTARIAS_SERVICE;

  endpointPostDetailTraining = environment.ENDPOINT_POST_DETAIL_TRAINING;

  constructor(
    private http: HttpClient,
  ) { }

  saveDetailTraining(detailTraining: DetailTraining):Observable<DetailTrainingResponse> {
    return this.http.post<DetailTrainingResponse>(
      `${this.apiTelematico}${this.msGestionNotariasService}${this.endpointPostDetailTraining}`, detailTraining);
  }
}
