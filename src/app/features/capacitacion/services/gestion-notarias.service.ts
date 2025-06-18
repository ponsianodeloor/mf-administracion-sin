import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DetailTraining, DetailTrainingResponse} from "../interfaces/detail-training";

@Injectable({
  providedIn: 'root'
})
export class GestionNotariasService {

  apiTelematico = environment.HOST_API_TELEMATICO;
  msGestionNotariasService = environment.MS_GESTION_NOTARIAS_SERVICE;

  endpointPostDetailTraining = environment.ENDPOINT_POST_DETAIL_TRAINING;
  endpointDeleteDetailTraining = environment.ENDPOINT_DELETE_DETAIL_TRAINING;

  constructor(
      private http: HttpClient,
  ) { }

  saveDetailTraining(detailTraining: DetailTraining):Observable<DetailTrainingResponse> {
    return this.http.post<DetailTrainingResponse>(
        `${this.apiTelematico}${this.msGestionNotariasService}${this.endpointPostDetailTraining}`, detailTraining);
  }

  deleteDetailTrainingById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTelematico}${this.msGestionNotariasService}${this.endpointDeleteDetailTraining}/${id}`);
  }

}
