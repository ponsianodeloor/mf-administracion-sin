import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  get bankDetails(): string {
    return environment.BANK_DETAILS;
  }

  get zoomParameters(): string {
    return environment.ZOOM_PARAMETERS;
  }
}
