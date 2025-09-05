export const environment = {
  production: false,
  text: "This is sqm environment",
  name: "sqm environment",

  SERVER_PESNOT: "https://sqm-api-pesnot.funcionjudicial.gob.ec",
  API_PESNOT: "https://sqm-api-pesnot.funcionjudicial.gob.ec",
  HOST_API_TELEMATICO: 'https://sqm-api-telematico.funcionjudicial.gob.ec',

  //TODO: Todas las variables de entorno son en mayúsculas y con guiones bajos
  AdministracionCatalogonemonicoPadre: "SERVICIOS_NOTARIALES",
  ParametrosSistemaPesnotTipoAmbiente: 'Tipo de Ambiente',
  CAPACITACION_NEMONICOPADRE_TIPO_CAPACITACION: 'TIPO-CAPACITACION',
  CAPACITACION_NEMONICOPADRE_TIPO_ASISTENCIA: 'TIPO-ASISTENCIA',
  MS_PESNOT_RESUMEN_SERVICE: '/pesnot-resumen-service/api',
  MS_PERSONAL_PESNOT_SERVICE: '/personal-pesnot-service/api',
  MS_GESTION_NOTARIAS_SERVICE: '/gestion-notarias-service/api',

  //Recursos de MS_PESNOT_RESUMEN_SERVICE
  RS_PARAMETRO_NOTARIAS_PESNOT: '/parametro-notarias-pesnot',

  ADMINISTRACION_CATALOGO_API_SERVICES: '/pesnot-resumen-service/api/catalogo',
  ADMINISTRACION_CATALOGO_AUXILIAR_API_SERVICES: '/gestion-notarias-service/api/catalogo-auxiliar',
  ADMINISTRACION_CAPACITACION_API_SERVICES: '/gestion-notarias-service/api/capacitacion',
  ADMINISTRACION_CAPACITACION_DETALLE_API_SERVICES: '/gestion-notarias-service/api/detalle-capacitacion/',
  ADMIN_PARAMETROS_FACTURACION_NOTARIA: '/pesnot-resumen-service/api/parametros-facturacion',
  MS_PARAMETROS_SISTEMAS_PESNOT: '/pesnot-resumen-service/api/parametros-sistema-pesnot',
  MS_NOTARIAS_PESNOT_SERVICE: "/NOTARIAS-PESNOT-SERVICE/api/pesnot",
  NOTARIAS_SERVICE_PESNOT: '/NOTARIAS-PESNOT-SERVICE/api',
  REPOSITORIO_SERVICE: '/REPOSITORIO-SERVICE/api',

  ENDPOINT_GET_PARAMETERS_NOTARIES: "/query/parametros-notarias/codigo",
  ENDPOINT_POST_UPDATE_VALUE_BY_ID: "/update-descripcion",
  ENDPOINT_POST_UPDATE_DESCRIPTION_BY_ID: "/update-descripcion",
  ENDPOINT_GET_PERSONA_ROL_SEARCH: '/persona-rol/index-paginated?search=',
  ENDPOINT_POST_DETAIL_TRAINING: '/detalle-capacitacion/store',
  ENDPOINT_DELETE_DETAIL_TRAINING: '/detalle-capacitacion',
  EP_GET_BILLING_PARAMETERS_NOTARIES: '/query/parametros-facturacion-notarias/notaria/',
  EP_POST_BILLING_PARAMETERS_NOTARIES_CREATE_OR_UPDATE: '/command/parametros-facturacion-notarias/createOrUpdate/',

  BANK_DETAILS: "DATOS-BANCARIOS",
  ZOOM_PARAMETERS: "PARAMETROS-ZOOM",
  IMAGE_BACKGROUND: 'https://pesnot.funcionjudicial.gob.ec/iconos/fondos/fondo-de-pantalla-pesnot.png',
};
