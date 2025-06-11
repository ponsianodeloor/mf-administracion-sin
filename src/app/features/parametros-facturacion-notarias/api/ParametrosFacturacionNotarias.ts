export interface ParametrosFacturacionNotarias {
  id?: number;
  idNotaria: number | string;
  claveAcceso: string;
  numeroRuc: string;
  tipoAmbiente?: number | string;
  establecimiento: string;
  puntoEmision: string;
  razonSocial: string;
  codigoContribuyenteEspecial: string;
  obligadoContabilidad: 'SI' | 'NO';
  logoEmision: string;
  nombreLogo: string;
  mimeLogo: string;
}
