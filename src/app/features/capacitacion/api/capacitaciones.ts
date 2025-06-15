export interface Capacitacion {
  id?: number;
  nombreCapacitacion: string;
  fechaCapacitacion: Date;
  duracion: number;
  lugarCapacitacion: string;
  tipoCapacitacion: number | string;
  tipoAsistencia: number | string;
}

export interface CapacitacionDetalle {
  id?: number;
  idCapacitacion: number | string;
  idPersonaNotario: number | string;
  isAsiste?: string;
  observaciones?: string;
}