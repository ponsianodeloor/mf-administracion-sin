export interface ParametrosFacturacionNotarias {
  id?: number;
  idNotaria: number | string;
  claveAcceso: string;
  NumeroRuc: string;
  TipoAmbiente?: number | string;
  Establecimiento: string;
  PuntoEmision: string;
  Razonsocial: string;
  CodigoContribuyenteEspecial: string;
  ObligadoContabilidad: 'SI' | 'NO';
  LogoEmision: string;
  nombreLogo: string;
  mimeLogo: string;
}
