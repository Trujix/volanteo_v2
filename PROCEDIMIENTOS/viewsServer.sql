
-- ===================== VISTA zonas2 ========================================
	-- DROP VIEW IF EXISTS vwZonas2;
	-- CREATE VIEW vwZonas2 AS
	-- SELECT Z.id idzona, Z.zona, Z.idProveedor, P.nombre nombre_proveedor, Z.idEdo, Z.estado, 
	-- 		 Z.municipios, M.nomMpo, Z.costoservicio, Z.costosadicionales
	-- FROM zonas2 Z 
	-- JOIN proveedores P ON Z.idProveedor = P.idproveedor
	-- JOIN grupoher_domgeo.municipios M ON M.cveEnt = Z.idEdo AND Z.municipios = M.cveMpo;


-- ===================== VISTA ZONAS DE COBERTURA ========================================
	DROP VIEW IF EXISTS vwZonas;
	CREATE VIEW vwZonas AS
	SELECT Z.idzona, Z.idProveedor, P.nombre nombre_proveedor, Z.idEdo, Z.estado, D.mun, M.nomMpo, Z.costoservicio, Z.costosadicionales 
	FROM zonas Z 
	JOIN detalles_zona D ON Z.idzona = D.idzona
	JOIN proveedores P ON Z.idProveedor = P.idproveedor
	JOIN grupoher_domgeo.municipios M ON M.cveEnt = Z.idEdo AND M.cveMpo = D.mun;

-- ===================== VISTA TRABAJOS NIVEL 1 ========================================
	/*DROP VIEW IF EXISTS vwTrabajosLvl1;
	CREATE VIEW vwTrabajosLvl1 AS
	SELECT T.idtrabajo, C.nombre, T.alias, T.tipo, T.fechasolicitud, T.vigencia, T.periodoini, T.periodofin, 
	T.cantidad, IF(T.`status` = 1, 'Completo', 'Incompleto') status
	FROM trabajos T JOIN clientes C ON T.idcliente = C.idcliente T.status > 0;*/

-- ===================== NUEVA VISTA TRABAJOS NIVEL 1 ========================================
-- COMO CAMBIO YA NO SE REQUIERE LA PALABRA "COMPLETO" O "INCOMPLETO"
	/*DROP VIEW IF EXISTS vwTrabajosLvl1;
	CREATE VIEW vwTrabajosLvl1 AS
	SELECT T.idtrabajo, C.nombre, T.alias, T.tipo, T.fechasolicitud, T.vigencia, T.periodoini, T.periodofin, 
	T.cantidad, T.status
	FROM trabajos T JOIN clientes C ON T.idcliente = C.idcliente WHERE T.status > 0*/

-- COMO CAMBIO YA NO SE REQUIERE LA PALABRA "COMPLETO" O "INCOMPLETO"
	DROP VIEW IF EXISTS vwTrabajosLvl1;
	CREATE VIEW vwTrabajosLvl1 AS 
	select t.idtrabajo AS idtrabajo,c.nombre AS nombre,t.alias AS alias,t.tipo AS tipo,t.fechasolicitud AS fechasolicitud,t.vigencia AS vigencia,t.periodoini AS periodoini,t.periodofin AS periodofin,t.cantidad AS cantidad,t.status AS status from (trabajos t join clientes c on((t.idcliente = c.idcliente))) where (t.status > 0)

-- ===================== VISTA TRABAJOS NIVEL 2 ========================================
	/*DROP VIEW IF EXISTS vwTrabajosLvl2;
	CREATE VIEW vwTrabajosLvl2 AS
	SELECT id, fk_idTrabajo idtrabajo, idEdo, edo, cantidad, 
	IF(status = 1, 'Completo', 'Incompleto') status 
	FROM trabajos_nivel2;*/

-- ===================== VISTA TRABAJOS NIVEL 2 ========================================
	DROP VIEW IF EXISTS vwTrabajosLvl2;
	CREATE VIEW vwTrabajosLvl2 AS
	SELECT T2.id, T2.fk_idTrabajo idtrabajo, T2.idEdo, T2.edo, T2.cantidad, T1.status 
	FROM trabajos_nivel2 T2 JOIN trabajos T1 ON T1.idtrabajo = T2.fk_idTrabajo;
	
-- ===================== VISTA TRABAJOS NIVEL 3 ========================================
	DROP VIEW IF EXISTS vwTrabajosLvl3;
	CREATE VIEW vwTrabajosLvl3 AS
	SELECT T.id, T.idZonaTrabajo, T.idProveedor, P.nombre, T.cantidad, T.municipios, T.nocubiertos
	FROM trabajos_zonas_detalles T JOIN proveedores P ON T.idProveedor = P.idproveedor;


	-- ===================== VISTA TRABAJOS ZONAS POLIGONOS =================================
	DROP VIEW IF EXISTS vwzonaspoligonos;
	CREATE VIEW vwzonaspoligonos AS
	SELECT id, territorio, nombre, fecha_registro 
	FROM zonaspoligonos WHERE status <> 0;


