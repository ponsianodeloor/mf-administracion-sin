export interface DetailTraining {
  id?:               number;
  idCapacitacion:   number;
  idPersona: number;
  isAsiste:         string;
  observaciones:    string;
}

export interface DetailTrainingResponse {
  id:               number;
  idCapacitacion:   number;
  idPersona: number;
  isAsiste:         string;
  observaciones:    string;
  idPersonaCrea:    number;
  fechaCrea:        string;
  ipCrea:           string;
  equipoCrea:       string;
  estado:           string;
}
