export interface ParametrosFacturacionNotarias {
  idParametrosFacturacionNotarias?: number;
  idNotaria:                       number;
  claveAcceso:                     string;
  numeroRuc:                       string;
  tipoAmbiente:                    number;
  establecimiento:                 string;
  puntoEmision:                    string;
  razonSocial:                     string;
  codigoContribuyenteEspecial:     string;
  obligadoContabilidad:            string;
  logoEmisor:                      string;
  nombreLogo:                      string;
}

export interface ParametrosFacturacionNotariasValidate {
  idNotaria: number;
  numeroRuc: string;
  establecimiento: string;
  puntoEmision: string;
}

export interface ParametrosFacturacionNotariasValidated {
  validated: boolean;
}
