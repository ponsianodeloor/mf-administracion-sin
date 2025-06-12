export const environment = {
  production: false,
  text: "This is development environment",
  name: "development environment",

  SERVER_PESNOT: "https://desa-api-pesnot.funcionjudicial.gob.ec",
  HOST_API_TELEMATICO: 'https://desa-api-telematico.funcionjudicial.gob.ec',

  //TODO: Todas las variables de entorno son en mayúsculas y con guiones bajos
  AdministracionCatalogonemonicoPadre: "SERVICIOS_NOTARIALES",
  ParametrosSistemaPesnotTipoAmbiente: 'Tipo de Ambiente',
  MS_PESNOT_RESUMEN_SERVICE: '/pesnot-resumen-service/api',

  //Recursos de MS_PESNOT_RESUMEN_SERVICE
  RS_PARAMETRO_NOTARIAS_PESNOT: '/parametro-notarias-pesnot',

  ADMINISTRACION_CATALOGO_API_SERVICES: '/pesnot-resumen-service/api/catalogo',
  ADMIN_PARAMETROS_FACTURACION_NOTARIA: '/pesnot-resumen-service/api/parametros-facturacion',
  MS_PARAMETROS_SISTEMAS_PESNOT: '/pesnot-resumen-service/api/parametros-sistema-pesnot',
  MS_NOTARIAS_PESNOT_SERVICE: "/NOTARIAS-PESNOT-SERVICE/api/pesnot",
  NOTARIAS_SERVICE_PESNOT: '/NOTARIAS-PESNOT-SERVICE/api',
  REPOSITORIO_SERVICE: '/REPOSITORIO-SERVICE/api',

  ENDPOINT_GET_PARAMETERS_NOTARIES: "/query/parametros-notarias/codigo",
  ENDPOINT_POST_UPDATE_VALUE_BY_ID: "/update-descripcion",
  ENDPOINT_POST_UPDATE_DESCRIPTION_BY_ID: "/update-descripcion",

  BANK_DETAILS: "DATOS-BANCARIOS",
  ZOOM_PARAMETERS: "PARAMETROS-ZOOM",
  IMAGE_BACKGROUND: 'https://pesnot.funcionjudicial.gob.ec/iconos/fondos/fondo-de-pantalla-pesnot.png',
};
