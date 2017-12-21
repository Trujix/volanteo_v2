-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Servidor: localhost
-- Tiempo de generación: 21-11-2016 a las 18:59:09
-- Versión del servidor: 5.0.51
-- Versión de PHP: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Base de datos: `volantes`
-- 

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `poligono_s_r1`
-- 

CREATE TABLE `poligono_s_r1` (
  `id` bigint(20) NOT NULL auto_increment,
  `zona` int(100) NOT NULL,
  `coords` varchar(2000) collate utf8_bin default NULL,
  `nombre` varchar(255) collate utf8_bin NOT NULL default 'NO ASIGNADO',
  `observaciones` text collate utf8_bin,
  `atributos` varchar(2000) collate utf8_bin default NULL,
  `fecha_registro` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `territorio` (`zona`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `poligono_z_r1`
-- 

CREATE TABLE `poligono_z_r1` (
  `id` bigint(20) NOT NULL auto_increment,
  `territorio` varchar(50) collate utf8_bin default NULL,
  `coords` varchar(2000) collate utf8_bin default NULL,
  `nombre` int(255) NOT NULL,
  `observaciones` text collate utf8_bin,
  `atributos` varchar(2000) collate utf8_bin default NULL,
  `fecha_registro` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `territorio` (`territorio`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `zonas`
-- 

CREATE TABLE `zonas` (
  `id` int(11) NOT NULL auto_increment,
  `territorio` varchar(255) collate utf8_bin NOT NULL,
  `nombre` varchar(255) collate utf8_bin NOT NULL,
  `status` int(11) NOT NULL default '1',
  `fecha_registro` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `territorio` (`territorio`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;
