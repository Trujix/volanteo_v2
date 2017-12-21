
-- ====================== NUEVA TABLA DE CLIENTES
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `encargado` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rfc` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `calle` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `noext` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `noint` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `colonia` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cp` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `pais` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `ciudad` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `municipio` int(11) DEFAULT NULL,
  `tel1` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tel2` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ctacorreo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `sitioweb` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `pass` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- ================ NUEVA TABLA DE BLOQUES DE SUCURSALES
DROP TABLE IF EXISTS `bloques`;
CREATE TABLE IF NOT EXISTS `bloques` (
  `idbloque` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `nombre` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `encargado` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ctacorreo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `celular` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `teloficina` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `whatsapp` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `pass` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`idbloque`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- ================ NUEVA TABLA DE SUCURSALES
DROP TABLE IF EXISTS `sucursales`;
CREATE TABLE IF NOT EXISTS `sucursales` (
  `idsucursal` int(11) NOT NULL AUTO_INCREMENT,
  `idbloque` int(100) COLLATE utf8_bin DEFAULT NULL,
  `nombre` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `encargado` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `ctacorreo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `telefono` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `estado` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `municipio` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `pass` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`idsucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ================ NUEVA TABLA DE SUCURSALES CON DOMGEO (ESTADO, MUNICIPIO Y LOCALIDADES)
DROP TABLE IF EXISTS `sucursales_domgeo`;
CREATE TABLE IF NOT EXISTS `sucursales_domgeo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(100) COLLATE utf8_bin DEFAULT NULL,
  `estado` int(100) COLLATE utf8_bin DEFAULT NULL,
  `municipio` int(100) COLLATE utf8_bin DEFAULT NULL,
  `localidad` int(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ================ NUEVA TABLA DE SUCURSALES CON POLIGONOS
DROP TABLE IF EXISTS `sucursales_poligonos`;
CREATE TABLE IF NOT EXISTS `sucursales_poligonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(100) COLLATE utf8_bin DEFAULT NULL,
  `estado` int(100) COLLATE utf8_bin DEFAULT NULL,
  `municipio` int(100) COLLATE utf8_bin DEFAULT NULL,
  `idpoligono` int(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- ================ NUEVA TABLA AUXILIAR "TRABAJOS - ALERTAS"
DROP TABLE IF EXISTS `alertas_trabajos`;
CREATE TABLE IF NOT EXISTS `alertas_trabajos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idtrabajo` int(100) NOT NULL,
  `tipo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `verifsumin` int(11) NOT NULL DEFAULT '0',
  `sumincompleto` int(11) NOT NULL DEFAULT '0',
  `llamarprovs` int(11) NOT NULL DEFAULT '0',
  `suminentregados` int(11) NOT NULL DEFAULT '0',
  `correoclientes` int(11) NOT NULL DEFAULT '0',
  `verifpropuesta` int(11) NOT NULL DEFAULT '0',
  `correoproveedores` int(11) NOT NULL DEFAULT '0',
  `proptrabajoprovs` int(11) NOT NULL DEFAULT '0',
  `enviopropcliente` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idtrabajo` (`idtrabajo`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ================ NUEVA TABLA AUXILIAR "TRABAJOS - SUCURSALES"
DROP TABLE IF EXISTS `trabajos_sucursales`;
CREATE TABLE IF NOT EXISTS `trabajos_sucursales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtrabajo` int(100) COLLATE utf8_bin DEFAULT NULL,
  `idcliente` int(100) COLLATE utf8_bin DEFAULT NULL,
  `idbloque` int(100) COLLATE utf8_bin DEFAULT NULL,
  `idsucursal` int(100) COLLATE utf8_bin DEFAULT NULL,
  `cantidad` int(100) COLLATE utf8_bin DEFAULT NULL,
  `proveedores` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ::::::::::: TABLA DE CONFIG_TRABAJO NUEVA
DROP TABLE IF EXISTS `config_trabajo`;
CREATE TABLE IF NOT EXISTS `config_trabajo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idtrabajo` int(100) NOT NULL,
  `sucursal` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cliente` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `cantidad` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cantTienda` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `vigencia` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `tipo` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
PRIMARY KEY (`id`),
  KEY `idtrabajo` (`idtrabajo`)
);
-- ::::::::::: TABLA DE DETALLES DE CONFIG_TRABAJO NUEVA
DROP TABLE IF EXISTS `config_trabajo_detalle`;
CREATE TABLE IF NOT EXISTS `config_trabajo_detalle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idconfig` int(100) NOT NULL,
  `sucursal` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `poligono` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cantidad` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `estado` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `municipio` varchar(100) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`),
  KEY `idconfig` (`idconfig`)
);

-- ::::::::::: TABLA DE DETALLES DE CONFIG_TRABAJO
DROP TABLE IF EXISTS `config_trabajo_proveedor`;
CREATE TABLE IF NOT EXISTS `config_trabajo_proveedor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(100) NOT NULL,
  `idtrabajo` int(100) NOT NULL,
  `cantidad` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `idproveedor` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `inicio` date DEFAULT '1111-11-11',
  `fin` date DEFAULT '1111-11-11',
  `status` int(11) NOT NULL DEFAULT '0',
PRIMARY KEY (`id`),
  KEY `idsucursal` (`idsucursal`)
);

-- ************ NUEVA 26-11-2017
-- ::::::::::: TABLA DE DETALLES DE CONFIG_TRABAJO_PERIFONEO
DROP TABLE IF EXISTS `config_trabajo_perifoneo`;
CREATE TABLE IF NOT EXISTS `config_trabajo_perifoneo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idtrabajo` int(100) NOT NULL,
  `idsucursal` int(100) NOT NULL,
  `fecha` date NOT NULL,
  `inicio` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `minutos` int(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
PRIMARY KEY (`id`),
  KEY `idtrabajo` (`idtrabajo`)
);

-- ************ NUEVA 26-11-2017
-- ::::::::::: TABLA DE DETALLES DE CONFIG_TRABAJO_DETALLE_PERIFONEO
DROP TABLE IF EXISTS `config_trabajo_detalle_perifoneo`;
CREATE TABLE IF NOT EXISTS `config_trabajo_detalle_perifoneo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idconfig` int(100) NOT NULL,
  `inicio` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
PRIMARY KEY (`id`),
  KEY `idconfig` (`idconfig`)
);


-- ::::::::::: TABLA DE DETALLES DE PROVEEDORES CON PASSWORD (NUEVA FUNCIONALIDAD)
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
  `idproveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rfc` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `calle` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `noext` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `noint` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `colonia` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cp` varchar(5) COLLATE utf8_bin DEFAULT '0',
  `pais` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `ciudad` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `municipio` int(11) DEFAULT NULL,
  `tel1` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tel3` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tel2` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ctacorreo` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `banco` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `clavebanco` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `nosucursal` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `nocuenta` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tarjeta` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `nombre_f` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rfc_f` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `calle_f` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `noext_f` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `noint_f` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `colonia_f` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cp_f` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `pais_f` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `estado_f` int(11) DEFAULT NULL,
  `ciudad_f` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `municipio_f` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `pass` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`idproveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `app_sucursales`;
CREATE TABLE IF NOT EXISTS `app_sucursales` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `idservicio` int(100) NOT NULL,
  `proveedor` int(100) NOT NULL,
  `idsucursal` int(11) NOT NULL DEFAULT '0',
  `txtsucursal` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
PRIMARY KEY (`id`),
  KEY `idservicio` (`idservicio`)
);

DROP TABLE IF EXISTS `geolocation`;
CREATE TABLE IF NOT EXISTS `geolocation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_device` VARCHAR(50) NOT NULL COLLATE 'utf8_bin',
  `id_service` INT(11) NOT NULL,
  `id_sucursal` INT(11) NOT NULL,
  `id_proveedor` INT(11) NOT NULL,
  `latitud` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_bin',
  `longitud` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_bin',
  `date_time` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_device`, `id_service`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;

DROP TABLE IF EXISTS `fotos`;
CREATE TABLE IF NOT EXISTS `fotos` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `id_service` int(11) NOT NULL,
 `id_proveedor` int(11) NOT NULL,
 `id_sucursal` int(11) NOT NULL,
 `url` varchar(100) COLLATE utf8_bin DEFAULT NULL,
 `date_time` datetime DEFAULT NULL,
 PRIMARY KEY (`id`,`id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
