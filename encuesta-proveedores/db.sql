-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.15-log - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para encuesta-proveedores
DROP DATABASE IF EXISTS `encuesta-proveedores`;
CREATE DATABASE IF NOT EXISTS `encuesta-proveedores` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `encuesta-proveedores`;

-- Volcando estructura para tabla encuesta-proveedores.area
DROP TABLE IF EXISTS `area`;
CREATE TABLE IF NOT EXISTS `area` (
  `id_area` int(11) NOT NULL,
  `area` varchar(400) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_area`),
  UNIQUE KEY `id_area` (`id_area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.area: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;

-- Volcando estructura para tabla encuesta-proveedores.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `contacto` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `facebook` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `num_telefono` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `domicilio` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `puntos` int(11) NOT NULL,
  PRIMARY KEY (`id_empresa`),
  UNIQUE KEY `id_empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.empresa: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`id_empresa`, `nombre`, `contacto`, `facebook`, `num_telefono`, `domicilio`, `puntos`) VALUES
	(1, 'José Angel Torres López', 'thekamitorres@gmail.com', 'aasd', '0', 'Roberto Suarez 607, Ramon Serrano', 95),
	(2, 'Manuel', 'torres_lopez@ucol.mx', 'asdasdf', '3121506956', 'Gil Cabrera Gudiño 644, Rancho Blanco 2', 0),
	(3, 'José Angel Torres López', 'torres_lopez@ucol.mx', 'ret', '3121506956', 'Gil Cabrera Gudiño 644, Rancho Blanco 2', 0),
	(4, 'José Angel Torres López', 'torres_lopez@ucol.mx', 'ret', '3121506956', 'Gil Cabrera Gudiño 644, Rancho Blanco 2', 0);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

-- Volcando estructura para tabla encuesta-proveedores.encuesta
DROP TABLE IF EXISTS `encuesta`;
CREATE TABLE IF NOT EXISTS `encuesta` (
  `id_encuesta` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `id_respuesta` int(11) NOT NULL,
  PRIMARY KEY (`id_encuesta`),
  UNIQUE KEY `id_encuesta` (`id_encuesta`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.encuesta: ~56 rows (aproximadamente)
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` (`id_encuesta`, `id_empresa`, `id_pregunta`, `id_respuesta`) VALUES
	(1, 1, 1, 1),
	(2, 1, 2, 3),
	(3, 1, 3, 5),
	(4, 1, 4, 7),
	(5, 1, 5, 9),
	(6, 1, 6, 11),
	(7, 1, 7, 13),
	(8, 1, 8, 15),
	(9, 1, 9, 17),
	(10, 1, 10, 19),
	(11, 1, 11, 21),
	(12, 1, 12, 25),
	(13, 1, 13, 27),
	(14, 1, 13, 27),
	(15, 2, 1, 0),
	(16, 2, 2, 0),
	(17, 2, 3, 0),
	(18, 2, 4, 0),
	(19, 2, 5, 0),
	(20, 2, 6, 0),
	(21, 2, 7, 0),
	(22, 2, 8, 0),
	(23, 2, 9, 0),
	(24, 2, 10, 0),
	(25, 2, 11, 0),
	(26, 2, 12, 0),
	(27, 2, 13, 0),
	(28, 2, 13, 0),
	(29, 3, 1, 0),
	(30, 3, 2, 0),
	(31, 3, 3, 0),
	(32, 3, 4, 0),
	(33, 3, 5, 0),
	(34, 3, 6, 0),
	(35, 3, 7, 0),
	(36, 3, 8, 0),
	(37, 3, 9, 0),
	(38, 3, 10, 0),
	(39, 3, 11, 0),
	(40, 3, 12, 0),
	(41, 3, 13, 0),
	(42, 3, 13, 0),
	(43, 4, 1, 0),
	(44, 4, 2, 0),
	(45, 4, 3, 0),
	(46, 4, 4, 0),
	(47, 4, 5, 0),
	(48, 4, 6, 0),
	(49, 4, 7, 0),
	(50, 4, 8, 0),
	(51, 4, 9, 0),
	(52, 4, 10, 0),
	(53, 4, 11, 0),
	(54, 4, 12, 0),
	(55, 4, 13, 0),
	(56, 4, 13, 0);
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;

-- Volcando estructura para tabla encuesta-proveedores.pregunta
DROP TABLE IF EXISTS `pregunta`;
CREATE TABLE IF NOT EXISTS `pregunta` (
  `id_pregunta` int(11) NOT NULL AUTO_INCREMENT,
  `id_area` int(11) NOT NULL,
  `pregunta` varchar(400) COLLATE utf8_spanish_ci NOT NULL,
  `repuestas` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  UNIQUE KEY `id_pregunta` (`id_pregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.pregunta: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` (`id_pregunta`, `id_area`, `pregunta`, `repuestas`) VALUES
	(1, 1, '¿Estás dispuesto a trabajar con una plataforma integral de tecnologías de la información? (Aplicaciones y redes sociales) Con esta plataforma se tiene en tiempo real acceso a los servicios que nos estás prestando.', '2'),
	(2, 1, '¿Cuántos años tienen de experiencia en el giro de volanteo y/o perifoneo.', '2'),
	(3, 1, '¿Qué cobertura tienen?', '2'),
	(4, 1, '¿Emiten facturas por prestación de servicios?', '2'),
	(5, 2, '¿Cuenta con oficinas?', '2'),
	(6, 2, '¿Cuentas con personal a tu cargo?', '2'),
	(7, 2, '¿Cuantas personas trabajan para ti?', '2'),
	(8, 2, '¿Cuenta con medio de trasporte propio?', '2'),
	(9, 3, '¿Tienes flexibilidad ante nuevos requerimientos de trabajo?', '2'),
	(10, 4, '¿Qué valor le da usted, al cumplimiento en tiempo y forma de plazos acordados para la realización de tu sevicio?', '2'),
	(11, 4, '¿Costo de los servicios?', '4'),
	(12, 4, '¿Está usted de acuerdo en que la forma de pago es de la siguiente manera?', '2'),
	(13, 4, '¿Plazo?', '2');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;

-- Volcando estructura para tabla encuesta-proveedores.pregunta_respuesta
DROP TABLE IF EXISTS `pregunta_respuesta`;
CREATE TABLE IF NOT EXISTS `pregunta_respuesta` (
  `id_pregunta_respuesta` int(11) NOT NULL AUTO_INCREMENT,
  `id_pregunta` int(11) NOT NULL,
  `id_respuesta` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  PRIMARY KEY (`id_pregunta_respuesta`),
  UNIQUE KEY `id_pregunta_respuesta` (`id_pregunta_respuesta`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.pregunta_respuesta: ~28 rows (aproximadamente)
/*!40000 ALTER TABLE `pregunta_respuesta` DISABLE KEYS */;
INSERT INTO `pregunta_respuesta` (`id_pregunta_respuesta`, `id_pregunta`, `id_respuesta`, `puntos`) VALUES
	(1, 1, 1, 20),
	(2, 1, 2, 0),
	(3, 2, 3, 3),
	(4, 2, 4, 5),
	(5, 3, 5, 3),
	(6, 3, 6, 5),
	(7, 4, 7, 2),
	(8, 4, 8, 1),
	(9, 5, 9, 3),
	(10, 5, 10, 2),
	(11, 6, 11, 5),
	(12, 6, 12, 3),
	(13, 7, 13, 8),
	(14, 7, 14, 6),
	(15, 8, 15, 2),
	(16, 8, 16, 3),
	(17, 9, 17, 15),
	(18, 10, 19, 8),
	(19, 10, 20, 7),
	(20, 9, 18, 0),
	(21, 11, 21, 15),
	(22, 11, 22, 10),
	(23, 11, 23, 15),
	(24, 11, 24, 10),
	(25, 12, 25, 8),
	(26, 12, 26, 6),
	(27, 13, 27, 3),
	(28, 13, 28, 2);
/*!40000 ALTER TABLE `pregunta_respuesta` ENABLE KEYS */;

-- Volcando estructura para tabla encuesta-proveedores.respuesta
DROP TABLE IF EXISTS `respuesta`;
CREATE TABLE IF NOT EXISTS `respuesta` (
  `id_respuesta` int(11) NOT NULL AUTO_INCREMENT,
  `respuesta` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  UNIQUE KEY `id_respuesta_2` (`id_respuesta`),
  KEY `id_respuesta` (`id_respuesta`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla encuesta-proveedores.respuesta: ~28 rows (aproximadamente)
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` (`id_respuesta`, `respuesta`) VALUES
	(1, 'Si'),
	(2, 'No'),
	(3, 'De 1 año a 3 años'),
	(4, 'De 4 años en adelante '),
	(5, 'De 1 a 3 localidades'),
	(6, 'De 4 localidades en adelante'),
	(7, 'Sí'),
	(8, 'No'),
	(9, 'Si'),
	(10, 'No'),
	(11, 'Si'),
	(12, 'No'),
	(13, 'De 1 a 5 personas'),
	(14, 'De 6 personas en adelante'),
	(15, 'Con 1 vehículo'),
	(16, '2 o más vehículos'),
	(17, 'Si (Situaciones: Reducción de tiempo de trabajo; Cambio de fechas y horarios.)'),
	(18, 'No'),
	(19, 'Es la base principal de todo negocio'),
	(20, 'Sí es importante'),
	(21, 'PERIFONEO - Si el costo de la hora se ubica entre los $90 y $120'),
	(22, 'PERIFONEO - Si el costo de la hora se ubica entre los $121 en adelante'),
	(23, 'VOLANTEO -  Si el costo del millar de volante se ubica entre $200 y $220'),
	(24, 'VOLANTEO -  Si el costo del millar de volante se ubica entre $221 en adelante'),
	(25, 'Si'),
	(26, 'Se puede negociar'),
	(27, '15 días '),
	(28, '7 días');
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
