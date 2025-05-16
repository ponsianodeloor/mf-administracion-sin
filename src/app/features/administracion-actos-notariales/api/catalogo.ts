export interface Catalogo {
  id?: number;
  idCatalogoPadre: number;
  nemonicoPadre: string;
  nemonico: string;
  nombre: string;
  orden: number;
  visible: string;
  descripcion: string;
  descripcionPie: string;
  urlNotarias: string;
  normativaNotaria: string;
  descripcionMedio: string;
  tipoActoNotarial: string;
  isPadre: string;
  idActoSin: number;
  idCatalogosPesnot: number;
  numeroIntervinientes: number;
  children?: Catalogo[];
}

export interface DocumentosObligatorios {
  id: number;
  idCatalogo: number;
  nombreArchivo: string;
  extensionArchivo: string;
  estado: string;
  tipoArchivo: string;
  fechaCrea: Date;
  fechaModifica: Date;
  idPersonaCrea: number;
  idPersonaModifica: number;
  ipCrea: string;
  equipoCrea: string;
  ipModifica: string;
  equipoModifica: string;
  motivoModifica: string;
  requiereFirmaNotario: string;
  isCedula: string;
  requiereFirma: string;
}

export interface CatalogosPesnot {
  id: number;
  estado: string;
  nombre: string;
  idCatalogoPadre: number;
  idTipoCatalogo: number;
  valorExtra: string;
  fechaCrea: Date;
  fechaModifica: Date;
  idPersonaCrea: number;
  idPersonaModifica: number;
  ipCrea: string;
  equipoCrea: string;
  ipModifica: string;
  equipoModifica: string;
  motivoModifica: string;
  idArchivoFlujoAgenda: number;
}

export interface Acto {
  idActo: number;
  articulo: string;
  estado: string;
  fechaFin: Date;
  fechaInicio: Date;
  nombre: string;
  observacion: string;
  requeridoCompareciente: boolean;
  idCatalogoTipoLibro: number;
  valorExtra: string;
  logicaCalculo_id: number;
  plantilla_id: number;
  pagaIVA: boolean;
  exonerado: boolean;
  guardaExtracto: boolean;
  mensajeSelActo: string;
  validaAdultoMayor: boolean;
  habilitaConsultaPoder: boolean;
  actoRevocatoria: boolean;
  actoPoder: boolean;
  exoneracionParticipacion: boolean;
  apellidos: string;
  apellidosConyugue: string;
  cantonResidencia: string;
  estadoCivil: string;
  exoneracionDinardap: boolean;
  genero: string;
  idConyuge: number;
  idPersona: number;
  identificacion: string;
  identificacionConyugue: string;
  nacionalidad: string;
  nombres: string;
  nombresConyugue: string;
  personaNatural: boolean;
  tieneConyuge: boolean;
  tipoExoneracionDinardap: string;
  tipoIdentificacion: string;
  tipoIdentificacionConyugue: string;
  idMatriz: number;
}



