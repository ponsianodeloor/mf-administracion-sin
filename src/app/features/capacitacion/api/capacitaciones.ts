export interface Capacitacion {
  id?: number;
  nombreCapacitacion: string;
  fechaCapacitacion: Date;
  duracion: number;
  lugarCapacitacion: string;
  tipoCapacitacion: number;
  tipoAsistencia: number;
}

export interface CapacitacionDetalle {
  id?: number;
  idCapacitacion: number;
  idPersonaNotario: number;
  isAsiste?: string;
  observaciones?: string;
}