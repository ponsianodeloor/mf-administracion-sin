/**
 * USE [PESNOT]
GO

/****** Object:  Table [CAT].[Catalogo]    Script Date: 9/5/2025 22:00:01 ******
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [CAT].[Catalogo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idCatalogoPadre] [int] NOT NULL,
	[nemonicoPadre] [varchar](500) NULL,
	[nemonico] [varchar](800) NULL,
	[nombre] [varchar](500) NULL,
	[orden] [int] NOT NULL,
	[visible] [varchar](1) NOT NULL,
	[descripcion] [varchar](3500) NULL,
	[descripcionPie] [varchar](800) NULL,
	[urlNotarias] [varchar](200) NOT NULL,
	[estado] [varchar](1) NOT NULL,
	[idPersonaCrea] [int] NULL,
	[fechaCrea] [datetime] NULL,
	[idPersonaModifica] [int] NULL,
	[fechaModifica] [datetime] NULL,
	[ipCrea] [varchar](25) NULL,
	[equipoCrea] [varchar](50) NULL,
	[ipModifica] [varchar](25) NULL,
	[equipoModifica] [varchar](50) NULL,
	[motivoModifica] [varchar](max) NULL,
	[normativaNotaria] [varchar](1000) NULL,
	[descripcionMedio] [varchar](800) NULL,
	[tipoActoNotarial] [varchar](30) NULL,
	[isPadre] [varchar](1) NULL,
	[idActoSin] [int] NULL,
	[idCatalogosPesnot] [int] NULL,
	[numeroIntervinientes] [int] NULL,
 CONSTRAINT [PK_Catalogo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Catalogo_IdCatalogoPadreNemonico] UNIQUE NONCLUSTERED 
(
	[idCatalogoPadre] ASC,
	[nemonico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_idCatalogoPadre_Sistema]  DEFAULT ((1)) FOR [idCatalogoPadre]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_estado_Nulo]  DEFAULT ('A') FOR [estado]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_idPersonaCrea_Sistema]  DEFAULT ((0)) FOR [idPersonaCrea]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_fechaCrea_FechaActual]  DEFAULT (getdate()) FOR [fechaCrea]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_idPersonaModifica_Sistema]  DEFAULT ((0)) FOR [idPersonaModifica]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_fechaModifica_FechaActual]  DEFAULT (getdate()) FOR [fechaModifica]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_ipCrea_Nulo]  DEFAULT ('') FOR [ipCrea]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_equipoCrea_Nulo]  DEFAULT ('') FOR [equipoCrea]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_ipModifica_Nulo]  DEFAULT ('') FOR [ipModifica]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_equipoModifica_Nulo]  DEFAULT ('') FOR [equipoModifica]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF_Catalogo_motivoModifica_Nulo]  DEFAULT ('') FOR [motivoModifica]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF__Catalogo__isPadr__73852659]  DEFAULT ('S') FOR [isPadre]
GO

ALTER TABLE [CAT].[Catalogo] ADD  CONSTRAINT [DF__Catalogo__numero__7755B73D]  DEFAULT ((2)) FOR [numeroIntervinientes]
GO

ALTER TABLE [CAT].[Catalogo]  WITH NOCHECK ADD  CONSTRAINT [FK_Catalogo_Catalogo_idCatalogoPadre] FOREIGN KEY([idCatalogoPadre])
REFERENCES [CAT].[Catalogo] ([id])
GO

ALTER TABLE [CAT].[Catalogo] CHECK CONSTRAINT [FK_Catalogo_Catalogo_idCatalogoPadre]
GO

ALTER TABLE [CAT].[Catalogo]  WITH CHECK ADD  CONSTRAINT [CHK_tipoActoNotarial] CHECK  (([tipoActoNotarial]='PRESENCIAL' OR [tipoActoNotarial]='TELEMATICO' OR [tipoActoNotarial]='TELEMÁTICO' OR [tipoActoNotarial]='ELECTRONICO' OR [tipoActoNotarial]='ELECTRÓNICO'))
GO

ALTER TABLE [CAT].[Catalogo] CHECK CONSTRAINT [CHK_tipoActoNotarial]
GO

ALTER TABLE [CAT].[Catalogo]  WITH CHECK ADD  CONSTRAINT [CK_Ubicacion_nemonico_NoVacio] CHECK  (([nemonico] IS NOT NULL AND [nemonico]<>''))
GO

ALTER TABLE [CAT].[Catalogo] CHECK CONSTRAINT [CK_Ubicacion_nemonico_NoVacio]
GO

ALTER TABLE [CAT].[Catalogo]  WITH CHECK ADD  CONSTRAINT [CK_Ubicacion_nombres_NoVacio] CHECK  (([nombre] IS NOT NULL AND [nombre]<>''))
GO

ALTER TABLE [CAT].[Catalogo] CHECK CONSTRAINT [CK_Ubicacion_nombres_NoVacio]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador (clave primaria) del catálogo' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador padre (clave primaria) del cual proviene o agrupa el catálogo ' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'idCatalogoPadre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nemónico padre o nombre padre agrupador del catálogo' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'nemonicoPadre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nemónico identificadot del catálogo especifico' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'nemonico'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del catálogo dentro del grupo o catálogo padre' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'nombre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Número de orden de visualización o presentación del grupo de catalogo' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'orden'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catálogo visible en el grupo o catalógo padre' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'visible'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripción con mayor detalla de lo que representa el catálogo' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estado del registro siendo los valores de A: Activo o para uso; X: Eliminado;  por defecto en estado A y H: Histórico' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'estado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificación de la tabla persona quien crea el registro el identificador 0 representa el sistema' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'idPersonaCrea'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de creación o inserción del registro por defecto la fecha actual' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'fechaCrea'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificación de la tabla persona quien modifica el registro, el identificador 0 representa el que el sistema lo registro cuando no lo tiene, por defecto sera el mismo usuario que creo al ingreso' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'idPersonaModifica'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de modificación o última actualizados por defecto la fecha actual a la creación' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'fechaModifica'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Dirección IP del equipo desde el cual se creo o se invoco la creación del registro' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'ipCrea'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del equipo desde el cual se creo o se invoco la creación del registro' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'equipoCrea'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Dirección IP del equipo desde el cual se modificó el registro' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'ipModifica'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del equipo desde el cual se modificóel registro' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'equipoModifica'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripción o detalle del motivo modificación de dato o datos del registro' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo', @level2type=N'COLUMN',@level2name=N'motivoModifica'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Catálogos o clasificación de información utilizada por los sistemas' , @level0type=N'SCHEMA',@level0name=N'CAT', @level1type=N'TABLE',@level1name=N'Catalogo'
GO




USE [PESNOT]
GO

/****** Object:  Table [CAT].[DocumentosObligatorios]    Script Date: 9/5/2025 22:05:10 ******
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [CAT].[DocumentosObligatorios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idCatalogo] [int] NULL,
	[nombreArchivo] [nvarchar](500) NOT NULL,
	[extensionArchivo] [nvarchar](100) NULL,
	[estado] [nvarchar](5) NULL,
	[tipoArchivo] [nvarchar](50) NULL,
	[fechaCrea] [datetime] NULL,
	[fechaModifica] [datetime] NULL,
	[idPersonaCrea] [int] NULL,
	[idPersonaModifica] [int] NULL,
	[ipCrea] [varchar](30) NULL,
	[equipoCrea] [varchar](50) NULL,
	[ipModifica] [varchar](30) NULL,
	[equipoModifica] [varchar](50) NULL,
	[motivoModifica] [varchar](500) NULL,
	[requiereFirmaNotario] [varchar](1) NULL,
	[isCedula] [varchar](2) NOT NULL,
	[requiereFirma] [varchar](1) NULL,
 CONSTRAINT [PK_Matriz_Servicios_Notariales] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_DocumentosObligatorios_idCatalogo_nombreArchivo] UNIQUE NONCLUSTERED 
(
	[idCatalogo] ASC,
	[nombreArchivo] ASC,
	[extensionArchivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [CAT].[DocumentosObligatorios] ADD  DEFAULT ('N') FOR [requiereFirmaNotario]
GO

ALTER TABLE [CAT].[DocumentosObligatorios] ADD  DEFAULT ('NO') FOR [isCedula]
GO

ALTER TABLE [CAT].[DocumentosObligatorios] ADD  DEFAULT ('N') FOR [requiereFirma]
GO




USE [NOTARIAL_JAVA]
GO

/****** Object:  Table [Notarial].[CatalogosPesnot]    Script Date: 9/5/2025 22:10:15 ******
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Notarial].[CatalogosPesnot](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[estado] [varchar](3) NOT NULL,
	[nombre] [varchar](200) NOT NULL,
	[idCatalogoPadre] [bigint] NULL,
	[idTipoCatalogo] [bigint] NULL,
	[valorExtra] [varchar](50) NULL,
	[fechaCrea] [datetime] NULL,
	[fechaModifica] [datetime] NULL,
	[idPersonaCrea] [int] NULL,
	[idPersonaModifica] [int] NULL,
	[ipCrea] [varchar](30) NULL,
	[equipoCrea] [varchar](50) NULL,
	[ipModifica] [varchar](30) NULL,
	[equipoModifica] [varchar](50) NULL,
	[motivoModifica] [varchar](500) NULL,
	[idArchivoFlujoAgenda] [int] NULL
) ON [PRIMARY]
GO



USE [NOTARIAL_JAVA]
GO

/****** Object:  Table [Notarial].[Acto]    Script Date: 9/5/2025 22:11:57 ******
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Notarial].[Acto](
	[idActo] [bigint] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[articulo] [varchar](255) NULL,
	[estado] [varchar](3) NULL,
	[fechaFin] [datetime2](7) NULL,
	[fechaInicio] [datetime2](7) NULL,
	[nombre] [varchar](255) NULL,
	[observacion] [varchar](500) NULL,
	[requeridoCompareciente] [bit] NULL,
	[idCatalogoTipoLibro] [bigint] NULL,
	[valorExtra] [varchar](50) NULL,
	[logicaCalculo_id] [bigint] NULL,
	[plantilla_id] [bigint] NULL,
	[pagaIVA] [bit] NULL,
	[exonerado] [bit] NOT NULL,
	[guardaExtracto] [bit] NULL,
	[mensajeSelActo] [varchar](255) NULL,
	[validaAdultoMayor] [bit] NULL,
	[habilitaConsultaPoder] [bit] NOT NULL,
	[actoRevocatoria] [bit] NOT NULL,
	[actoPoder] [bit] NOT NULL,
	[exoneracionParticipacion] [bit] NULL,
	[apellidos] [varchar](150) NULL,
	[apellidosConyugue] [varchar](150) NULL,
	[cantonResidencia] [varchar](60) NULL,
	[estadoCivil] [varchar](30) NULL,
	[exoneracionDinardap] [bit] NULL,
	[genero] [varchar](30) NULL,
	[idConyuge] [bigint] NULL,
	[idPersona] [bigint] NULL,
	[identificacion] [varchar](20) NULL,
	[identificacionConyugue] [varchar](20) NULL,
	[nacionalidad] [varchar](80) NULL,
	[nombres] [varchar](500) NULL,
	[nombresConyugue] [varchar](150) NULL,
	[personaNatural] [bit] NULL,
	[tieneConyuge] [bit] NULL,
	[tipoExoneracionDinardap] [varchar](2) NULL,
	[tipoIdentificacion] [varchar](50) NULL,
	[tipoIdentificacionConyugue] [varchar](50) NULL,
	[idMatriz] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[idActo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ((1)) FOR [exonerado]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ('0') FOR [guardaExtracto]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ((0)) FOR [validaAdultoMayor]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ((0)) FOR [habilitaConsultaPoder]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ((0)) FOR [actoRevocatoria]
GO

ALTER TABLE [Notarial].[Acto] ADD  DEFAULT ((0)) FOR [actoPoder]
GO

ALTER TABLE [Notarial].[Acto]  WITH CHECK ADD  CONSTRAINT [FK_a81yjjpqvdjmjl8q07x2uly] FOREIGN KEY([plantilla_id])
REFERENCES [Notarial].[Plantilla] ([id])
GO

ALTER TABLE [Notarial].[Acto] CHECK CONSTRAINT [FK_a81yjjpqvdjmjl8q07x2uly]
GO

ALTER TABLE [Notarial].[Acto]  WITH CHECK ADD  CONSTRAINT [FK_gclt7s77h8j2nnkk5vxu5xxj1] FOREIGN KEY([logicaCalculo_id])
REFERENCES [Notarial].[LogicaCalculo] ([id])
GO

ALTER TABLE [Notarial].[Acto] CHECK CONSTRAINT [FK_gclt7s77h8j2nnkk5vxu5xxj1]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador único del acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'idActo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Artículo legal que identifica al acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'articulo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estado en que se encuentra el Acto (ACT / INA)' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'estado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en la que termina del Acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'fechaFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en la que inicia el Acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'fechaInicio'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'nombre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Información general del acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'observacion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si es necesario o no el compareciente (1/0)' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'requeridoCompareciente'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Referencia la identificador del catálogo tipo libro' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'idCatalogoTipoLibro'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si un acto requiere un tratamiento especial.' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'valorExtra'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Referencia al id de la Tabla LogicaCalculo' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'logicaCalculo_id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Referencia al id de la Plantilla' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'plantilla_id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si paga o no IVA (1/0)' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'pagaIVA'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si permite o no exoneración de discapacidad y/o tercera edad.  (1/0)' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'exonerado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si guarda extracto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'guardaExtracto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Mensaje informativo en pantalla al seleccionar el acto' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'mensajeSelActo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Bandera para validar que al grabar acto tenga por lo menos un interviniente adulto mayor' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'validaAdultoMayor'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determinar si se presenta o no el botón consulta de poderes' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'habilitaConsultaPoder'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el acto corresponde a una revocatoria de poderes' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'actoRevocatoria'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el acto corresponde a un poder' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto', @level2type=N'COLUMN',@level2name=N'actoPoder'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Registra la información del catálogo de Actos.' , @level0type=N'SCHEMA',@level0name=N'Notarial', @level1type=N'TABLE',@level1name=N'Acto'
GO



*/

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



