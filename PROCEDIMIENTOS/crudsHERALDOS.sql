
-- ============== Insertar un registro en el historial ======================================
	DROP PROCEDURE IF EXISTS SP_INSERTHISTORIAL;

	DELIMITER $$
	CREATE PROCEDURE SP_INSERTHISTORIAL(IN _accion VARCHAR(200), IN _admin VARCHAR(20), IN _date VARCHAR(50), IN _time VARCHAR(50))
	BEGIN
		-- DECLARE _accion VARCHAR(200);
		-- SET _accion = CONCAT('Se dio de baja el chofer con nombre: ',_nombre);
		INSERT INTO historial (usuario, fecha, hora, accion) VALUES (_admin, _date, _time, _accion);
	END $$
	DELIMITER ;


-- ============= Procedimientos para la vista Index ==========================================
	DROP PROCEDURE IF EXISTS login;

	DELIMITER $$
	CREATE PROCEDURE login(
		IN _user VARCHAR(50), IN _pass VARCHAR(200)	
	)
	BEGIN
		DECLARE _salt VARCHAR(100) DEFAULT '-t3CN01oG1a5%C0s173c!';
		DECLARE _password VARCHAR(100);
		SET _password = CONCAT(_salt,'',_pass);
		SELECT id, rol, username FROM usuarios WHERE username = _user AND password = SHA(md5(_password));
		-- SELECT SHA(md5(_password));
	END $$
	DELIMITER ;



	DROP FUNCTION IF EXISTS FN_GENERAPASS;

	DELIMITER $$

	CREATE FUNCTION FN_GENERAPASS(_pass VARCHAR(200)) RETURNS VARCHAR(200)
	BEGIN
		DECLARE _salt VARCHAR(100) DEFAULT '-t3CN01oG1a5%C0s173c!';
		DECLARE _password VARCHAR(200);
		SET _password = CONCAT(_salt,'',_pass);
		RETURN SHA(md5(_password));
	END $$
	DELIMITER ;

-- ============== PROCEDIMIENTOS PARA MODULO CLIENTES ======================================

	-- ============== Obtener un cliente a partir del Id ===================================
	DROP PROCEDURE IF EXISTS SP_GETCLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_GETCLIENTE(IN _id INT)
	BEGIN
		DECLARE _edo INT;
		SET _edo = (SELECT estado FROM clientes WHERE idcliente = _id);
		SELECT * FROM clientes WHERE idcliente = _id
		UNION
		SELECT cveMpo, nomMpo,'','','','','','','','','','','','','','','','','' 
		FROM grupoher_domgeo.municipios WHERE cveEnt = _edo;
	END $$
	DELIMITER ;


	-- ============== Obtener todas los clientes =============================================
	DROP PROCEDURE IF EXISTS SP_SHOWCLIENTES;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWCLIENTES(IN _status INT)
	BEGIN
		IF _status = 0 OR _status = 1 THEN
			SELECT idcliente, nombre, rfc, CONCAT(tel1,' | ', tel2), 
			ctacorreo, IF(status = 0, "Inactivo", "Activo") as status
			FROM clientes
			WHERE status = _status;
		ELSE
			IF _status = 2 THEN
				SELECT idcliente, nombre, rfc, CONCAT(tel1,' | ', tel2), 
				ctacorreo, IF(status = 0, "Inactivo", "Activo") as status
				FROM clientes;
			END IF;
		END IF;
	END $$
	DELIMITER ;


	-- ============== Dar de baja al cliente =======================================================
	DROP PROCEDURE IF EXISTS SP_DELETECLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETECLIENTE(
		IN _id INT, IN _user VARCHAR(20),
		IN _date VARCHAR(50), IN _time VARCHAR(50),
		IN _accion VARCHAR(500)
	)
	BEGIN
		UPDATE clientes SET status = 0 WHERE idcliente = _id;
		UPDATE clientes C JOIN bloques B ON B.idcliente = C.idcliente SET B.status = 0 WHERE C.idcliente = _id;
		UPDATE clientes C JOIN bloques B ON B.idcliente = C.idcliente JOIN sucursales S ON S.idbloque = B.idbloque SET S.status = 0 WHERE C.idcliente = _id;
		CALL SP_INSERTHISTORIAL(_accion, _user, _date, _time);
	END $$
	DELIMITER ;

	-- ============== ELIMINAR DEFINITIVAMENTE AL CLIENTE ===========================================
	DROP PROCEDURE IF EXISTS SP_ELIMINARCLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_ELIMINARCLIENTE(
		IN _id INT
	)
	BEGIN
		DELETE FROM sucursales WHERE idbloque IN (SELECT idbloque FROM bloques WHERE idcliente = _id);
		DELETE FROM bloques WHERE idcliente = _id;
		DELETE FROM clientes WHERE idcliente = _id;
	END $$
	DELIMITER ;


	-- ============== Reactivar cliente =========================================================
	DROP PROCEDURE IF EXISTS SP_REACTIVACLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_REACTIVACLIENTE(IN _id INT)
	BEGIN
		UPDATE clientes SET status = 1 WHERE idcliente = _id;
		UPDATE clientes C JOIN bloques B ON B.idcliente = C.idcliente SET B.status = 1 WHERE C.idcliente = _id;
		UPDATE clientes C JOIN bloques B ON B.idcliente = C.idcliente JOIN sucursales S ON S.idbloque = B.idbloque SET S.status = 1 WHERE C.idcliente = _id;
	END $$
	DELIMITER ;

	-- ============== Actualizar la información de un cliente =================================================
	DROP PROCEDURE IF EXISTS SP_UPDATECLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATECLIENTE(
		IN _nombre VARCHAR(100), IN _rfc VARCHAR(100), IN _encargado VARCHAR(100), IN _calle VARCHAR(100),
		IN _noext VARCHAR(50), IN _noint VARCHAR(50), IN _colonia VARCHAR(50),
		IN _cp VARCHAR(5), IN _pais VARCHAR(50), IN _estado INT, IN _id INT,
		IN _ciudad VARCHAR(50), IN _mun INT, IN _tel1 VARCHAR(50),
		IN _tel2 VARCHAR(50), IN _correo VARCHAR(50), IN _web VARCHAR(50)
	)
	BEGIN
		UPDATE clientes SET nombre = _nombre, rfc = _rfc, encargado = _encargado, calle = _calle, noext = _noext,
		noint = _noint, colonia = _colonia, cp = _cp, pais = _pais, estado = _estado,
		ciudad = _ciudad, municipio = _mun, ctacorreo = _correo, tel1 = _tel1, tel2 = _tel2, 
		sitioweb = _web
		WHERE idcliente = _id;
	END $$
	DELIMITER ;


	-- ============== Agregar un nuevo cliente =================================================
	DROP PROCEDURE IF EXISTS SP_CREATECLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATECLIENTE(
		IN _nombre VARCHAR(100), IN _rfc VARCHAR(100), IN _encargado VARCHAR(100), IN _calle VARCHAR(100),
		IN _noext VARCHAR(50), IN _noint VARCHAR(50), IN _colonia VARCHAR(50),
		IN _cp VARCHAR(5), IN _pais VARCHAR(50), IN _estado INT,
		IN _ciudad VARCHAR(50), IN _mun INT, IN _tel1 VARCHAR(50),
		IN _tel2 VARCHAR(50), IN _correo VARCHAR(50), IN _web VARCHAR(50), IN _pass VARCHAR(100)
	)
	BEGIN
		INSERT INTO clientes (
			nombre, rfc, encargado ,calle, noext, noint, colonia, cp,  pais, estado, 
			ciudad, municipio, tel1, tel2, ctacorreo, sitioweb, pass, status
		)
		VALUES(
			_nombre, _rfc, _encargado,_calle, _noext, _noint, _colonia, _cp, _pais, _estado, 
			_ciudad, _mun, _tel1, _tel2, _correo, _web, _pass, 1
		);
	END $$
	DELIMITER ;


-- ============== PROCEDIMIENTOS PARA MODULO PROVEEDORES ======================================

	-- ============== Obtener un proveedor a partir del Id ===================================
	DROP PROCEDURE IF EXISTS SP_GETPROVEEDOR;

	DELIMITER $$

	CREATE PROCEDURE SP_GETPROVEEDOR(IN _id INT)
	BEGIN
		DECLARE _edo INT;
		DECLARE _edoF INT;
		
		SELECT estado, estado_f INTO _edo, _edoF FROM proveedores
		WHERE idproveedor = _id;
		
		SELECT *, 'info' info FROM proveedores WHERE idproveedor = _id
		UNION
		SELECT cveMpo, nomMpo,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','m1' 
		FROM grupoher_domgeo.municipios WHERE grupoher_domgeo.municipios.cveEnt = _edo
		UNION
		SELECT cveMpo, nomMpo,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','m2' 
		FROM grupoher_domgeo.municipios WHERE grupoher_domgeo.municipios.cveEnt = _edoF;
		
	END $$
	DELIMITER ;



	-- ============== Obtener todas los proveedores ===========================================
	DROP PROCEDURE IF EXISTS SP_SHOWPROVEEDORES;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWPROVEEDORES(IN _status INT)
	BEGIN
		IF _status = 0 OR _status = 1 THEN
			SELECT idproveedor, nombre, rfc, tel1, 
			ctacorreo, IF(status = 0, "Inactivo", "Activo") as status
			FROM proveedores
			WHERE status = _status;
		ELSE
			IF _status = 2 THEN
				SELECT idproveedor, nombre, rfc, tel1, 
				ctacorreo, IF(status = 0, "Inactivo", "Activo") as status
				FROM proveedores;
			END IF;
		END IF;
	END $$
	DELIMITER ;

	-- ============== Dar de baja al proveedor =======================================================
	DROP PROCEDURE IF EXISTS SP_DELETEPROVEEDOR;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETEPROVEEDOR(
		IN _id INT, IN _user VARCHAR(20),
		IN _date VARCHAR(50), IN _time VARCHAR(50),
		IN _accion VARCHAR(500)
	)
	BEGIN
		UPDATE proveedores SET status = 0 WHERE idproveedor = _id;
		CALL SP_INSERTHISTORIAL(_accion, _user, _date, _time);
	END $$
	DELIMITER ;


	-- ============== Reactivar proveedor =========================================================
	DROP PROCEDURE IF EXISTS SP_REACTIVAPROVEEDOR;

	DELIMITER $$

	CREATE PROCEDURE SP_REACTIVAPROVEEDOR(IN _id INT)
	BEGIN
		UPDATE proveedores SET status = 1 WHERE idproveedor = _id;
	END $$
	DELIMITER ;


	-- ============== Actualizar la información de un proveedor =================================================
	DROP PROCEDURE IF EXISTS SP_UPDATEPROVEEDOR;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATEPROVEEDOR(
		IN _nombre VARCHAR(100), IN _rfc VARCHAR(100), IN _calle VARCHAR(100),
		IN _noext VARCHAR(50), IN _noint VARCHAR(50), IN _colonia VARCHAR(50),
		IN _cp VARCHAR(5), IN _pais VARCHAR(50), IN _estado INT,
		IN _ciudad VARCHAR(50), IN _mun INT, IN _banco VARCHAR(50), IN _clave VARCHAR(50), 
		IN _sucursal VARCHAR(50), IN _cuenta VARCHAR(50), IN _tel1 VARCHAR(50), IN _tel2 VARCHAR(50), 
		IN _tel3 VARCHAR(50), IN _correo VARCHAR(50), IN _id INT,
		IN _nombreF VARCHAR(100), IN _rfcF VARCHAR(100), IN _calleF VARCHAR(100),
		IN _noextF VARCHAR(50), IN _nointF VARCHAR(50), IN _coloniaF VARCHAR(50),
		IN _cpF VARCHAR(5), IN _paisF VARCHAR(50), IN _estadoF INT,
		IN _ciudadF VARCHAR(50), IN _munF INT, IN _tarjeta VARCHAR(50)
	)
	BEGIN
		UPDATE proveedores SET nombre = _nombre, rfc = _rfc, calle = _calle, noext = _noext,
		noint = _noint, colonia = _colonia, cp = _cp, pais = _pais, estado = _estado,
		ciudad = _ciudad, municipio = _mun, banco = _banco, clavebanco = _clave, tarjeta = _tarjeta, 
		nosucursal = _sucursal, nocuenta = _cuenta, tel1 = _tel1, tel2 = _tel2, tel3 = _tel3, 
		ctacorreo = _correo, nombre_f = _nombreF, rfc_f = _rfcF, calle_f = _calleF, noext_f = _noextF,
		noint_f = _nointF, colonia_f = _coloniaF, cp_f = _cpF, pais_f = _paisF, estado_f = _estadoF,
		ciudad_f = _ciudadF, municipio_f = _munF
		WHERE idproveedor = _id;
	END $$
	DELIMITER ;



	-- ============== Agregar un nuevo proveedor =================================================
	DROP PROCEDURE IF EXISTS SP_CREATEPROVEEDOR;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATEPROVEEDOR(
		IN _nombre VARCHAR(100), IN _rfc VARCHAR(100), IN _calle VARCHAR(100),
		IN _noext VARCHAR(50), IN _noint VARCHAR(50), IN _colonia VARCHAR(50),
		IN _cp VARCHAR(5), IN _pais VARCHAR(50), IN _estado INT,
		IN _ciudad VARCHAR(50), IN _mun INT, IN _banco VARCHAR(50),
		IN _clave VARCHAR(50), IN _sucursal VARCHAR(50), IN _cuenta VARCHAR(50),
		IN _tel1 VARCHAR(50), IN _tel2 VARCHAR(50), IN _tel3 VARCHAR(50), 
		IN _correo VARCHAR(50),
		IN _nombreF VARCHAR(100), IN _rfcF VARCHAR(100), IN _calleF VARCHAR(100),
		IN _noextF VARCHAR(50), IN _nointF VARCHAR(50), IN _coloniaF VARCHAR(50),
		IN _cpF VARCHAR(5), IN _paisF VARCHAR(50), IN _estadoF INT,
		IN _ciudadF VARCHAR(50), IN _munF INT, IN _tarjeta VARCHAR(50), IN _pass VARCHAR(200)
	)
	BEGIN

		INSERT INTO proveedores (
			nombre, rfc, calle, noext, noint, colonia, cp,  pais, estado, 
			ciudad, municipio, tel1, tel2, tel3, ctacorreo, banco, clavebanco, tarjeta, 
			nosucursal, nocuenta, 
			nombre_f, rfc_F, calle_f, noext_f, noint_f, colonia_f, cp_f, 
			pais_f, estado_f, ciudad_f, municipio_f, status, pass
		)
		VALUES(
			_nombre, _rfc, _calle, _noext, _noint, _colonia, _cp, _pais, _estado, _ciudad, _mun, 
			_tel1, _tel2, _tel3, _correo, _banco, _clave, _tarjeta, _sucursal, _cuenta, 
			_nombreF, _rfcF, _calleF, _noextF, _nointF, _coloniaF, _cpF, _paisF, _estadoF, _ciudadF, _munF, 1, _pass
		);
		
	END $$
	DELIMITER ;


-- ============== PROCEDIMIENTOS PARA MODULO PROVEEDORES - ZONAS ======================================
	
	-- ============== Obtener una zona a partir del id ===================================
	DROP PROCEDURE IF EXISTS SP_GETZONA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETZONA(IN _id INT)
	BEGIN
		SELECT idEdo, costoservicio, costosadicionales
		FROM zonas WHERE idzona = _id;
	END $$
	DELIMITER ;

	-- ============== Obtener detalles de una zona a partir del id ===================================
	DROP PROCEDURE IF EXISTS SP_GET_DETALLES_ZONA;

	DELIMITER $$

	CREATE PROCEDURE SP_GET_DETALLES_ZONA(IN _id INT)
	BEGIN
		SELECT mun FROM detalles_zona
		WHERE idzona = _id;
	END $$
	DELIMITER ;


	-- ============== Actualizar la información de un proveedor =================================================
	DROP PROCEDURE IF EXISTS SP_UPDATEZONA;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATEZONA(
		IN _idzona INT, IN _idedo INT, IN _edo TEXT, IN _muns TEXT,
		IN _costoserv VARCHAR(50), IN _costosad VARCHAR(50)
	)
	BEGIN
		UPDATE zonas SET 
			idEdo = _idedo, 
			estado = _edo, 
			costoservicio = _costoserv, 
			costosadicionales = _costosad
		WHERE idzona = _idzona;
		
		DELETE FROM detalles_zona WHERE idzona = _idzona;
		SET @s = CONCAT('INSERT INTO detalles_zona (idzona, edo, mun) VALUES ', _muns);
		PREPARE stmt FROM @s;
		EXECUTE stmt;
		
	END $$
	DELIMITER ;



	-- ============== Obtener todas las zonas asignadas a un proveedor ================================
	DROP PROCEDURE IF EXISTS SP_SHOWZONAS;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWZONAS(IN _idprov INT)
	BEGIN
		SELECT idzona, estado, CONCAT('$',costoservicio), CONCAT('$',costosadicionales) 
		FROM zonas WHERE idProveedor = _idprov
		ORDER BY idzona ASC;
	END $$
	DELIMITER ;


	-- ============== Dar de baja una de la zonas ================================================
	DROP PROCEDURE IF EXISTS SP_DELETEZONA;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETEZONA(IN _id INT)
	BEGIN
		DELETE FROM zonas WHERE idzona = _id;
	END $$
	DELIMITER ;


	-- ============== Agregar un nuevo proveedor =================================================
	
	DROP PROCEDURE IF EXISTS SP_CREATEZONA;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATEZONA(
		IN _idprov INT, IN _idedo INT, IN _edo TEXT, IN _values TEXT,
		IN _costoserv VARCHAR(50), IN _costosad VARCHAR(50)
	)
	BEGIN	
		
		DECLARE _sql VARCHAR(5000);
		DECLARE _lastID INT;

		INSERT INTO zonas (
			idProveedor, idEdo, estado, costoservicio, costosadicionales
		)
		VALUES(
			_idprov, _idedo, _edo, _costoserv, _costosad
		);
		
		SET _lastID = (SELECT DISTINCT LAST_INSERT_ID() FROM zonas);
		SET _sql = (SELECT REPLACE(_values, '$', _lastID));
		SET @s = CONCAT('INSERT INTO detalles_zona (idzona, edo, mun) VALUES ', _sql);

		PREPARE stmt3 FROM @s;
		EXECUTE stmt3;
	END $$
	DELIMITER ;

-- ============== PROCEDIMIENTOS PARA MODULO CLIENTES - BLOQUES ======================================
-- ================================= [19/07/2017] =======================================
	-- ============== CONSULTA PARA OBTENER LOS BLOQUES DE SUCURSALES =======================
	DROP PROCEDURE IF EXISTS SP_SHOWBLOQUES;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWBLOQUES(IN _idcliente INT)
	BEGIN
		SELECT idbloque, nombre, encargado FROM bloques WHERE idcliente = _idcliente
		ORDER BY idbloque ASC;
	END $$
	DELIMITER ;

	-- ============== AGREGAR UN NUEVO BLOQUE =================================================
	DROP PROCEDURE IF EXISTS SP_CREATEBLOQUE;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATEBLOQUE(
		IN _idcliente INT, IN _nombre VARCHAR(200), IN _encargado VARCHAR(200), IN _ctacorreo VARCHAR(200),
		IN _celular VARCHAR(200), IN _teloficina VARCHAR(200), IN _whatsapp VARCHAR(50),  IN _pass VARCHAR(50)
	)
	BEGIN
		INSERT INTO bloques (
			idcliente, nombre, encargado, ctacorreo, celular, teloficina, whatsapp, pass 
		)
		VALUES(
			_idcliente, _nombre, _encargado, _ctacorreo, _celular, _teloficina, _whatsapp, _pass
		);
	END $$
	DELIMITER ;

	-- ============== CONSULTA PARA OBTENER LOS BLOQUES PARA EDITAR =======================
	DROP PROCEDURE IF EXISTS SP_SHOWBLOQUESEDIT;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWBLOQUESEDIT(IN _idbloque INT)
	BEGIN
		SELECT * FROM bloques WHERE idbloque = _idbloque;
	END $$
	DELIMITER ;

	-- ============== ACTUALIZAR UN BLOQUE =================================================
	DROP PROCEDURE IF EXISTS SP_UPDATEBLOQUE;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATEBLOQUE(
		IN _idbloque INT, IN _nombre VARCHAR(50), IN _encargado VARCHAR(200),
		IN _ctacorreo VARCHAR(200), IN _celular VARCHAR(200), IN _teloficina VARCHAR(200), IN _whatsapp VARCHAR(200)
	)
	BEGIN
		UPDATE bloques SET
			nombre = _nombre, encargado = _encargado, 
			ctacorreo = _ctacorreo, celular = _celular, teloficina = _teloficina, 
			whatsapp = _whatsapp
		WHERE idbloque = _idbloque;
	END $$
	DELIMITER ;

	-- ============== ELIMINAR UN BLOQUE =================================================
	DROP PROCEDURE IF EXISTS SP_DELETEBLOQUE;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETEBLOQUE(IN _idbloque INT)
	BEGIN
		DELETE FROM bloques WHERE idbloque = _idbloque;
		DELETE D FROM sucursales_domgeo D JOIN sucursales S ON S.idbloque = _idbloque WHERE D.idsucursal = S.idsucursal;
		DELETE P FROM sucursales_poligonos P JOIN sucursales S ON S.idbloque = _idbloque WHERE P.idsucursal = S.idsucursal;
		DELETE FROM sucursales WHERE idbloque = _idbloque;
	END $$
	DELIMITER ;

	-- ============= PROCEDIMIENTOS PARA SUCURSALES ===========================
	-- ============== CONSULTA PARA OBTENER LAS SUCURSALES =======================
	DROP PROCEDURE IF EXISTS SP_SHOWSUCURSALES;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWSUCURSALES(IN _idbloque INT)
	BEGIN
		SELECT idsucursal, nombre, encargado FROM sucursales WHERE idbloque = _idbloque
		ORDER BY idsucursal ASC;
	END $$
	DELIMITER ;

	-- ============== AGREGAR NUEVA SUCURSAL =======================
	DROP PROCEDURE IF EXISTS SP_CREATESUCURSAL;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATESUCURSAL(
		IN _idbloque INT, IN _nombre VARCHAR(200), IN _encargado VARCHAR(200), IN _correo VARCHAR(200), IN _telefono VARCHAR(50), 
		IN _estado VARCHAR(200), IN _municipio VARCHAR(200), IN _pass VARCHAR(200), IN _localidades TEXT, IN _poligonos TEXT
	)
	BEGIN	

		DECLARE _sql TEXT;
		DECLARE _sql2 TEXT;
		DECLARE _lastID INT;

		INSERT INTO sucursales (
			idbloque, nombre, encargado, ctacorreo, telefono, estado, municipio, pass 
		)
		VALUES (
			_idbloque, _nombre, _encargado, _correo, _telefono, _estado, _municipio, _pass
		);
			
		SET _lastID = (SELECT DISTINCT LAST_INSERT_ID() FROM sucursales);
		SET _sql = (SELECT REPLACE(_localidades, '$', _lastID));
		SET _sql2 = (SELECT REPLACE(_poligonos, '$', _lastID));
			
		SET @d = CONCAT('INSERT INTO sucursales_domgeo (idsucursal, estado, municipio, localidad) VALUES ', _sql);
		PREPARE stmt FROM @d;
		EXECUTE stmt;

		SET @p = CONCAT('INSERT INTO sucursales_poligonos (idsucursal, estado, municipio, idpoligono) VALUES ', _sql2);
		PREPARE stmt2 FROM @p;
		EXECUTE stmt2;
		
	END $$
	DELIMITER ;

	-- ==================== EDITAR SUCURSAL ==========================
	DROP PROCEDURE IF EXISTS SP_EDITSUCURSAL;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITSUCURSAL(
		IN _idsucursal INT, IN _nombre VARCHAR(200), IN _encargado VARCHAR(200), IN _correo VARCHAR(200), IN _telefono VARCHAR(50), 
		IN _estado VARCHAR(200), IN _municipio VARCHAR(200), IN _localidades TEXT, IN _poligonos TEXT
	)
	BEGIN	

		UPDATE sucursales SET
			nombre = _nombre, encargado = _encargado, ctacorreo = _correo, telefono = _telefono, 
			estado = _estado, municipio = _municipio
		WHERE idsucursal = _idsucursal;

		DELETE FROM sucursales_domgeo WHERE idsucursal = _idsucursal;
		DELETE FROM sucursales_poligonos WHERE idsucursal = _idsucursal;
			
		SET @d = CONCAT('INSERT INTO sucursales_domgeo (idsucursal, estado, municipio, localidad) VALUES ', _localidades);
		PREPARE stmt FROM @d;
		EXECUTE stmt;

		SET @p = CONCAT('INSERT INTO sucursales_poligonos (idsucursal, estado, municipio, idpoligono) VALUES ', _poligonos);
		PREPARE stmt2 FROM @p;
		EXECUTE stmt2;
		
	END $$
	DELIMITER ;

	-- ============== ELIMINAR UNA SUCURSAL =================================================
	DROP PROCEDURE IF EXISTS SP_DELETESUCURSAL;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETESUCURSAL(IN _idsucursal INT)
	BEGIN
		DELETE FROM sucursales_domgeo WHERE idsucursal = _idsucursal;
		DELETE FROM sucursales_poligonos WHERE idsucursal = _idsucursal;
		DELETE FROM sucursales WHERE idsucursal = _idsucursal;
	END $$
	DELIMITER ;



-- ============== PROCEDIMIENTOS PARA MODULO CLIENTES - TIENDAS ======================================

	-- ============== Obtener todas las tiendas asignadas a un cliente ================================
	DROP PROCEDURE IF EXISTS SP_SHOWTIENDAS;

	DELIMITER $$

	CREATE PROCEDURE SP_SHOWTIENDAS(IN _idcliente INT)
	BEGIN
		SELECT idtienda, nombre, CONCAT(calle,' ',noext,', ',colonia) direccion, encargado
		FROM tiendas WHERE idcliente = _idcliente
		ORDER BY idtienda ASC;
	END $$
	DELIMITER ;

	-- ============== Agregar una nueva tienda =================================================
	DROP PROCEDURE IF EXISTS SP_CREATETIENDA;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATETIENDA(
		IN _idcliente INT, IN _nombre VARCHAR(50), IN _encargado VARCHAR(50),
		IN _edo INT, IN _mun INT, IN _loc INT, IN _col VARCHAR(50), 
		IN _cp VARCHAR(50), IN _calle VARCHAR(50), IN _noint VARCHAR(50), 
		IN _noext VARCHAR(50), IN _lat VARCHAR(50), IN _lng VARCHAR(50)
	)
	BEGIN

		INSERT INTO tiendas (
			idcliente, nombre, encargado, estado, municipio, localidad, 
			colonia, cp, calle, noint, noext, lat, lng
		)
		VALUES(
			_idcliente, _nombre, _encargado, _edo, _mun, _loc, 
			_col, _cp, _calle, _noint, _noext, _lat, _lng
		);
	END $$
	DELIMITER ;


	--  ===== Obtener la unfomacion para llenar el formualrio de edicion de tiendas ==============
	DROP PROCEDURE IF EXISTS SP_GETINFOTIENDA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETINFOTIENDA(IN _id INT)
	BEGIN
		DECLARE _cp INT DEFAULT 0;
		DECLARE _edo INT DEFAULT 0;
		DECLARE _mun INT DEFAULT 0;
		DECLARE _loc INT DEFAULT 0;
		-- DECLARE _col INT DEFAULT 0;
		
		SELECT cp, estado, municipio, localidad INTO _cp, _edo, _mun, _loc
		FROM tiendas WHERE idtienda = _id;
		
		SELECT 'ListEdo' iden, cveEnt clave, nombEnt nombre FROM grupoher_domgeo.estados -- Lista de estados
		UNION
		SELECT 'Edo' iden, cveEnt clave, nombent nombre FROM grupoher_domgeo.estados WHERE cveEnt = _edo -- Estado
		UNION
		SELECT 'ListMun' iden, cveMpo clave, nomMpo nombre FROM grupoher_domgeo.municipios WHERE cveEnt = _edo -- Lista de municipios
		UNION
		SELECT 'Mun' iden, cveMpo clave, nomMpo nombre FROM grupoher_domgeo.municipios WHERE cveEnt = _edo AND cveMpo = _mun -- Municipio
		UNION
		SELECT 'ListLoc' iden, cveLoc clave, nomLoc nombre FROM grupoher_domgeo.localidades WHERE cveEnt = _edo AND cveMpo = _mun -- Lista de localidades
		UNION
		SELECT 'Loc' iden, cveLoc clave, nomLoc nombre FROM grupoher_domgeo.localidades WHERE cveEnt = _edo AND cveMpo = _mun AND cveLoc = _loc; -- Localidad
		-- UNION
		-- SELECT 'ListAsen' iden, cveAsen clave, nomAsen nombre FROM domgeo.vwDomgeoByCP CP WHERE cp = _cp -- lista de asentamientos
		-- UNION
		-- SELECT 'Asen' iden, cveAsen clave, nomAsen nombre FROM domgeo.asentamientos WHERE cveEnt = _edo AND cveMpo = _mun AND cveLoc = _loc AND cveAsen = _col;
		
		-- select _cp, _edo, _mun, _loc, _col;
		-- SELECT * FROM tiendas WHERE idtienda = _id;
	END $$
	DELIMITER ;


	-- ============== Obtiene la informacion espesifica de una tienda ===========================
	DROP PROCEDURE IF EXISTS SP_GETTIENDA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETTIENDA(IN _id INT)
	BEGIN

		SELECT * FROM tiendas WHERE idtienda = _id;
	END $$
	DELIMITER ;



	-- ============== Actualizar una tienda =================================================
	DROP PROCEDURE IF EXISTS SP_UPDATETIENDA;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATETIENDA(
		IN _idtienda INT, IN _nombre VARCHAR(50), IN _encargado VARCHAR(50),
		IN _edo INT, IN _mun INT, IN _loc INT, IN _col VARCHAR(50), 
		IN _cp VARCHAR(50), IN _calle VARCHAR(50), IN _noint VARCHAR(50), 
		IN _noext VARCHAR(50), IN _lat VARCHAR(50), IN _lng VARCHAR(50)
	)
	BEGIN

		UPDATE tiendas SET
			nombre = _nombre, encargado = _encargado, 
			estado = _edo, municipio = _mun, localidad = _loc, 
			colonia = _col, cp = _cp, calle = _calle, noint = _noint, 
			noext = _noext, lat = _lat, lng = _lng
		WHERE idtienda = _idtienda;
	END $$
	DELIMITER ;


-- ============== PROCEDIMIENTOS PARA MODULO TRABAJOS ================================================

-- ============== Agregar un trabajo =================================================
	DROP PROCEDURE IF EXISTS SP_CREATETRABAJO;

	DELIMITER $$

	CREATE PROCEDURE SP_CREATETRABAJO(
		IN _cliente INT, IN _fecha1 DATE, IN _hora TIME, IN _via VARCHAR(50),
		IN _alias VARCHAR(50),IN _tipo VARCHAR(50), IN _cantidad VARCHAR(50),IN _periodo VARCHAR(50),
		IN _fecha2 DATE, IN _fecha3 DATE, IN _detalles VARCHAR(500), IN _status INT, 
		IN _values TEXT, IN _values2 LONGTEXT, IN _bandera TEXT
	)
	BEGIN	

		DECLARE _sql TEXT;
		DECLARE _sql2 TEXT;
		DECLARE _lastID INT;

		IF _bandera = 'PASO3' THEN

			SET @p3 = CONCAT('INSERT INTO trabajos_zonas_detalles (idZonaTrabajo, idProveedor, cantidad, municipios, nocubiertos) VALUES ', _values2);

			PREPARE stmt2 FROM @p3;
			EXECUTE stmt2;

		END IF;

		IF _bandera = 'PASO1Y2' THEN

			INSERT INTO trabajos (
				idcliente, fechasolicitud, hora, recibido_via, alias, tipo, 
				cantidad, vigencia, periodoini, periodofin, detalles, status
			)
			VALUES (
				_cliente, _fecha1, _hora, _via, _alias, _tipo, 
				_cantidad, _periodo, _fecha2, _fecha3, _detalles, _status
			);
			
			SET _lastID = (SELECT DISTINCT LAST_INSERT_ID() FROM trabajos);

			SET _sql = (SELECT REPLACE(_values, '$', _lastID));
			SET @s = CONCAT('INSERT INTO trabajos_nivel2 (fk_idTrabajo, idEdo, edo, cantidad, status) VALUES ', _sql);

			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;

		END IF;
		
	END $$
	DELIMITER ;

	-- ============== Actualizar un trabajo =================================================
	DROP PROCEDURE IF EXISTS SP_EDITTRABAJOS;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITTRABAJOS(
		IN _id INT, IN _ids TEXT, IN _cliente INT, IN _fecha1 DATE,
		IN _hora TIME, IN _via VARCHAR(50), IN _alias VARCHAR(50), IN _tipo VARCHAR(50), IN _cantidad VARCHAR(50), IN _periodo VARCHAR(50),
		IN _fecha2 DATE, IN _fecha3 DATE, IN _detalles VARCHAR(500), IN _status INT,
		IN _tabla2 TEXT, IN _tabla3 TEXT, IN _accion TEXT
	)
	BEGIN

		IF _accion = 'PASO1' THEN
			DELETE FROM trabajos_nivel2 WHERE fk_idTrabajo = _id;
			SET @s1 = CONCAT('DELETE FROM trabajos_zonas_detalles WHERE idZonaTrabajo IN ', _ids);
			PREPARE stmt1 FROM @s1;
			EXECUTE stmt1;

			UPDATE trabajos SET
				idcliente = _cliente,
				fechasolicitud = _fecha1,
				hora = _hora,
				recibido_via = _via,
				alias = _alias,
				tipo = _tipo,
				cantidad = _cantidad,
				vigencia = _periodo,
				periodoini = _fecha2,
				periodofin = _fecha3,
				detalles = _detalles,
				status = _status
			WHERE idtrabajo = _id;

			SET @s2 = CONCAT('INSERT INTO trabajos_nivel2 (fk_idTrabajo, idEdo, edo, cantidad, status) VALUES ', _tabla2);
			PREPARE stmt2 FROM @s2;
			EXECUTE stmt2;
		END IF;
		
		IF _accion = 'PASO2' THEN
			SET @s3 = CONCAT('INSERT INTO trabajos_zonas_detalles (idZonaTrabajo, idProveedor, cantidad, municipios, nocubiertos) VALUES ', _tabla3);

			PREPARE stmt3 FROM @s3;
			EXECUTE stmt3;
		END IF;

	END $$
	DELIMITER ;

	-- ============== Eliminar un trabajo (no se elimina, solo cambia status a 2) ==========================
	DROP PROCEDURE IF EXISTS SP_DELETETRABAJOS;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETETRABAJOS(
		IN _id INT
	)
	BEGIN

		UPDATE trabajos SET
			status = -1
		WHERE idtrabajo = _id;

	END $$
	DELIMITER ;

	-- ============== PROCEDIMIENTOS PARA MODULO POLIGONOS ================================================
	-- ============== ALTA DE POLIGONOS ================================================
	DROP PROCEDURE IF EXISTS SP_CREARPOLIGONO;

	DELIMITER $$

	CREATE PROCEDURE SP_CREARPOLIGONO(
		IN _cadena TEXT, IN _cadenaZonas TEXT, IN _id TEXT
	)
	BEGIN
		DECLARE _tablaSQL TEXT;
		DECLARE _tablaNoms TEXT;
		DECLARE _lastID INT;

		IF _id = 'zonas' THEN
			SET @z = CONCAT('INSERT INTO zonaspoligonos (territorio, nombre, fecha_registro) VALUES ', _cadenaZonas);
			PREPARE stmt FROM @z;
			EXECUTE stmt;

			SET _lastID = (SELECT DISTINCT LAST_INSERT_ID() FROM zonaspoligonos);
			SET _cadena = (SELECT REPLACE(_cadena, '$', _lastID));

			SET _tablaSQL = 'poligono_zonas';
			SET _tablaNoms = ' (territorio, coords, nombre, observaciones, numvolantes, hrsperifoneo, atributos, fecha_registro) ';
		END IF;
			
		IF _id = 'seccion' THEN
			SET _tablaSQL = 'poligono_seccion';
			SET _tablaNoms = ' (zona, coords, nombre, observaciones, numvolantes, hrsperifoneo, atributos, fecha_registro) ';
		END IF;

		SET @p = CONCAT('INSERT INTO ', _tablaSQL, _tablaNoms,'VALUES ', _cadena);
		PREPARE stmt2 FROM @p;
		EXECUTE stmt2;
	END $$
	DELIMITER ;

	-- ============== EDICION DE POLIGONOS ================================================
	DROP PROCEDURE IF EXISTS SP_EDITARPOLIGONO;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITARPOLIGONO(
		IN _id TEXT, IN _coords TEXT, IN _tabla TEXT
	)

	BEGIN
		IF _tabla = 'zona' THEN
			SET _tabla = 'zonas';
		END IF;
		
		SET @e = CONCAT('UPDATE poligono_', _tabla,' SET coords = ', _coords, ' WHERE id = ', _id);
		PREPARE stmt FROM @e;
		EXECUTE stmt;
	END $$
	DELIMITER ;

	-- ============== EDICION DE POLIGONOS CANTS ============================================
	DROP PROCEDURE IF EXISTS SP_EDITARPOLIGONOCANTS;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITARPOLIGONOCANTS(
		IN _id TEXT, IN _volanteo TEXT, IN _perifoneo TEXT, IN _tabla TEXT
	)

	BEGIN
		IF _tabla = 'zona' THEN
			SET _tabla = 'zonas';
		END IF;
		
		SET @e = CONCAT('UPDATE poligono_', _tabla,' SET numvolantes=', _volanteo, ', hrsperifoneo=', _perifoneo, ' WHERE id = ', _id);
		PREPARE stmt FROM @e;
		EXECUTE stmt;
	END $$
	DELIMITER ;


	-- ============== BAJA DE POLIGONOS ================================================
	DROP PROCEDURE IF EXISTS SP_BAJAPOLIGONO;

	DELIMITER $$

	CREATE PROCEDURE SP_BAJAPOLIGONO(
		IN _id TEXT, IN _tabla TEXT
	)

	BEGIN

		SET @b = CONCAT('UPDATE poligono_', _tabla,' SET status = 0 WHERE id = ', _id);
		PREPARE stmt FROM @b;
		EXECUTE stmt;

		IF _tabla = 'zonas' THEN
			SET @b2 = CONCAT('UPDATE poligono_seccion SET status = 0 WHERE zona = ', _id);
			PREPARE stmt2 FROM @b2;
			EXECUTE stmt2;

			UPDATE zonaspoligonos SET
				status = 0
			WHERE id = _id;
		END IF;
		
	END $$
	DELIMITER ;


	-- ============== PROCEDIMIENTOS PARA MODULO CORREOS Y CLIENTES- TRABAJOS =====================
	-- ============== GUARDAR CONFIG DEL MAIL =================================================
	DROP PROCEDURE IF EXISTS SP_ALTAMAIL;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTAMAIL(
		IN _idtrabajo INT, IN _idcliente VARCHAR(50), IN _url TEXT
	)
	BEGIN

		INSERT INTO adminmail (
			idtrabajo, idcliente, url
		)
		VALUES(
			_idtrabajo, _idcliente, _url
		);
	END $$
	DELIMITER ;

	-- =========== REENVIO DEL MAIL (CAMBIA STATUS DEL ANTERIOR A 0) =================
	DROP PROCEDURE IF EXISTS SP_REENVIARMAIL;

	DELIMITER $$

	CREATE PROCEDURE SP_REENVIARMAIL(
		IN _idmail INT
	)
	BEGIN
		UPDATE adminmail SET
			status = 0
		WHERE id = _idmail;
	END $$
	DELIMITER ;


	-- ============== CONFIG TRABAJO =================================================
	DROP PROCEDURE IF EXISTS SP_CONFIGTRABAJO;

	DELIMITER $$

	CREATE PROCEDURE SP_CONFIGTRABAJO(
		IN _mail INT, IN _trabajo INT, IN _sucursal VARCHAR(100), IN _cliente VARCHAR(50), IN _cantidad INT,
		IN _cantidadTienda INT, IN _vigencia VARCHAR(100), IN _tipo VARCHAR(50), IN _detalles TEXT, IN _status INT
	)
	BEGIN	

		DECLARE _sql TEXT;
		DECLARE _lastID INT;

		INSERT INTO config_trabajo (
			idtrabajo, sucursal, cliente, cantidad, cantTienda, vigencia, tipo
		)
		VALUES (
			_trabajo, _sucursal, _cliente, _cantidad, _cantidadTienda, _vigencia, _tipo
		);
			
		SET _lastID = (SELECT DISTINCT LAST_INSERT_ID() FROM config_trabajo);

		SET _sql = (SELECT REPLACE(_detalles, '$', _lastID));
		SET @s = CONCAT('INSERT INTO config_trabajo_detalle (idconfig, sucursal, poligono, cantidad, estado, municipio) VALUES ', _sql);

		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;
		
	END $$
	DELIMITER ;


	-- ============== NUEVA ACCION [01/08/2017] ======================================
	-- ============== CONFIG TRABAJO =================================================
	DROP PROCEDURE IF EXISTS SP_MAILSTATUS;

	DELIMITER $$

	CREATE PROCEDURE SP_MAILSTATUS(
		IN _mail INT, IN _status INT
	)
	BEGIN
		UPDATE adminmail SET
			status = _status
		WHERE id = _mail;
	END $$
	DELIMITER ;

	-- =========== RESTAURAR CONFIG TRABAJO ==============================================
	DROP PROCEDURE IF EXISTS SP_RESTCONFIGTRABAJO;

	DELIMITER $$

	CREATE PROCEDURE SP_RESTCONFIGTRABAJO(
		IN _idconf INT
	)
	BEGIN	
		DELETE FROM config_trabajo
			WHERE id = _idconf;

		DELETE FROM config_trabajo_detalle
			WHERE idconfig = _idconf;
		
	END $$
	DELIMITER ;

	-- ============== CAMBIAR STATUS TRABAJO (PROVEEDORES Y COMPLETO) =================================
	DROP PROCEDURE IF EXISTS SP_CAMBIARSTATUS;

	DELIMITER $$

	CREATE PROCEDURE SP_CAMBIARSTATUS(
		IN _id INT, IN _accion VARCHAR(50)
	)
	BEGIN
		DECLARE _status INT;
		IF _accion = 'CLIENTE' THEN
			SET _status = 3;
		END IF;
		
		IF _accion = 'PROVEEDOR' THEN
			SET _status = 4;
		END IF;

		IF _accion = 'COMPLETAR' THEN
			SET _status = 5;
		END IF;

		UPDATE adminmail SET
			status = _status
		WHERE id = _id;
	END $$
	DELIMITER ;

	-- =================== AGREGAR CAMPOS LISTOS CONFIG_TRABAJO_PROVEEDORES =========
	DROP PROCEDURE IF EXISTS SP_CONFIGTRABPROVS;

	DELIMITER $$

	CREATE PROCEDURE SP_CONFIGTRABPROVS(
		IN _cadena TEXT
	)
	BEGIN
		SET @s = CONCAT('INSERT INTO config_trabajo_proveedor (idsucursal, idtrabajo, cantidad, idproveedor) VALUES ', _cadena);
		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;
	END $$
	DELIMITER ;

	-- ============== EDITAR FECHAS DE LA TABLA PROVS =================================
	DROP PROCEDURE IF EXISTS SP_ACTCONFIGTRABPROVS;

	DELIMITER $$

	CREATE PROCEDURE SP_ACTCONFIGTRABPROVS(
		IN _idtrab INT, IN _idsucursal INT,
		IN _idprov INT, IN _ini DATE,
		IN _fin DATE
	)
	BEGIN
		UPDATE config_trabajo_proveedor SET
			inicio = _ini,
			fin = _fin,
			status = 1
			WHERE idsucursal = _idsucursal AND idtrabajo = _idtrab AND idproveedor = _idprov;
	END $$
	DELIMITER ;

	-- ============== DESHACER PROPUESTA DE PROVEEDOR =================================
	DROP PROCEDURE IF EXISTS SP_DELETEPROPUESTAPROV;

	DELIMITER $$

	CREATE PROCEDURE SP_DELETEPROPUESTAPROV(
		IN _idtrab INT, IN _idsucursal INT, IN _idprov INT, IN _idmail INT
	)
	BEGIN
		UPDATE config_trabajo_proveedor SET
			inicio = '0000-00-00',
			fin = '0000-00-00',
			status = 0
		WHERE idsucursal = _idsucursal AND idtrabajo = _idtrab AND idproveedor = _idprov;

		UPDATE adminmail SET
			status = 4
		WHERE id = _idmail;
	END $$
	DELIMITER ;

	-- ============== PROCEDIMIENTOS PARA VIGENCIAS Y ALERTAS =====================
	-- ================ FUNCION ALTA FECHA ALERTAS
	DROP PROCEDURE IF EXISTS SP_ALTATRABAJOPENDIENTES;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTATRABAJOPENDIENTES(
		IN _idtrabajo INT, IN _tipo VARCHAR(50)
	)
	BEGIN
		INSERT INTO alertas_trabajos (
			idtrabajo, tipo
		)
		VALUES(
			_idtrabajo, _tipo
		);
	END $$
	DELIMITER ;

	-- ================ FUNCION ALTA FECHA ALERTAS
	DROP PROCEDURE IF EXISTS SP_ALTAFECHALERTA;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTAFECHALERTA(
		IN _fecha VARCHAR(50)
	)
	BEGIN

		INSERT INTO alertas_fechas (
			fecha
		)
		VALUES(
			_fecha
		);
	END $$
	DELIMITER ;

	-- ============= FUNCION AUMENTAR STATUS DE ALERTA EN FECHAS 
	DROP PROCEDURE IF EXISTS SP_FECHANUMALERTA;

	DELIMITER $$

	CREATE PROCEDURE SP_FECHANUMALERTA(
		IN _fecha VARCHAR(50), IN _aumento INT
	)
	BEGIN
		UPDATE alertas_fechas SET
			numalerta = _aumento
		WHERE fecha = _fecha;
	END $$
	DELIMITER ;

	-- ================== FUNCION RESTAURAR TABLAS RELACIONADAS A TRABAJOS SP_ACTUALIZARPENDIENTETRABAJO
	DROP PROCEDURE IF EXISTS SP_RESTAURARTRABAJOSANEXAS;

	DELIMITER $$

	CREATE PROCEDURE SP_RESTAURARTRABAJOSANEXAS(
		IN _idtrabajo INT
	)
	BEGIN
		DECLARE _idconfig INT;
	
		DELETE FROM adminmail
		WHERE idtrabajo = _idtrabajo;

		DELETE FROM config_trabajo_proveedor
		WHERE idtrabajo = _idtrabajo;

		DELETE FROM alertas_trabajos
		WHERE idtrabajo = _idtrabajo;

		DELETE FROM trabajos_sucursales
		WHERE idtrabajo = _idtrabajo;
	
		SET _idconfig = (SELECT id FROM config_trabajo WHERE idtrabajo = _idtrabajo);

		DELETE FROM config_trabajo_detalle
		WHERE idconfig = _idconfig;

		DELETE FROM config_trabajo
		WHERE idtrabajo = _idtrabajo;
	END $$
	DELIMITER ;

	-- ================== FUNCION ACTUALIZAR STATUS DE ACCION PENDIENTE (TRABAJOS)
	DROP PROCEDURE IF EXISTS SP_ACTUALIZARPENDIENTETRABAJO;

	DELIMITER $$

	CREATE PROCEDURE SP_ACTUALIZARPENDIENTETRABAJO(
		IN _fila VARCHAR(50), IN _idtrabajo INT, IN _accion VARCHAR(50)
	)
	BEGIN
		DECLARE _sql TEXT;
		IF _accion = 'ACTIVAR' THEN
			SET _sql = CONCAT('UPDATE alertas_trabajos SET ', _fila, ' = 1 WHERE idtrabajo = ', _idtrabajo);
		END IF;
		
		IF _accion = 'DESACTIVAR' THEN
			SET _sql = CONCAT('UPDATE alertas_trabajos SET ', _fila, ' = 0 WHERE idtrabajo = ', _idtrabajo);
		END IF;
		
		SET @s = _sql;
		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;

	END $$
	DELIMITER ;

	-- ========= FUNCION QUE CAMBIA STATUS DE MAIL PARA QUE EL CLIENTE EDITE ========
	DROP PROCEDURE IF EXISTS SP_EDITCLIENTEMAILSTATUS;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITCLIENTEMAILSTATUS(
		IN _idtrabajo INT
	)
	BEGIN
		UPDATE adminmail SET
			status = 3
		WHERE idtrabajo = _idtrabajo;

	END $$
	DELIMITER ;	

	-- ================== FUNCION QUE CAMBIA STATUS DE TRABAJO =================
	DROP PROCEDURE IF EXISTS SP_STATUSTRABAJO;

	DELIMITER $$

	CREATE PROCEDURE SP_STATUSTRABAJO(
		IN _idtrabajo INT, IN _status INT
	)
	BEGIN
		UPDATE trabajos SET
			status = _status
		WHERE idtrabajo = _idtrabajo;

		IF _status = 11 THEN
			UPDATE config_trabajo_proveedor SET
				status = 2
			WHERE idtrabajo = _idtrabajo;
		END IF;

	END $$
	DELIMITER ;


	-- ================== :::::::::: [02/08/2017] :::::::::::: =================
	-- ================== FUNCION QUE CAMBIA STATUS DE TRABAJO =================
	DROP PROCEDURE IF EXISTS SP_STATUSUCURSAL;

	DELIMITER $$

	CREATE PROCEDURE SP_STATUSUCURSAL(
		IN _idtrabajo INT, IN _idsucursal INT, IN _status INT
	)
	BEGIN
		UPDATE trabajos_sucursales SET
			status = _status
		WHERE idtrabajo = _idtrabajo AND idsucursal = _idsucursal;
	END $$
	DELIMITER ;

	-- =============== ::::::::: FUNCION LOGIN CLIENTE ::::::: ==========
	DROP PROCEDURE IF EXISTS SP_LOGINCLIENTE;

	DELIMITER $$

	CREATE PROCEDURE SP_LOGINCLIENTE(
		IN _correo VARCHAR(200), IN _pass VARCHAR(200), IN _tipo VARCHAR(200)
	)
	BEGIN
		IF _tipo = "clientes" THEN
			SELECT idcliente, encargado, status FROM clientes WHERE ctacorreo = _correo AND pass = _pass;
		END IF;
		IF _tipo = "bloques" THEN
			SELECT idbloque, encargado, status FROM bloques WHERE ctacorreo = _correo AND pass = _pass;
		END IF;
		IF _tipo = "sucursales" THEN
			SELECT idsucursal, encargado, status FROM sucursales WHERE ctacorreo = _correo AND pass = _pass;
		END IF;
		IF _tipo = "proveedores" THEN
			SELECT idproveedor, nombre, status FROM proveedores WHERE ctacorreo = _correo AND pass = _pass;
		END IF;
	END $$
	DELIMITER ;

	-- =============== ::::::::: FUNCION UPDATE PASSWORD ::::::: ==========
	DROP PROCEDURE IF EXISTS SP_UPDATEPASS;

	DELIMITER $$

	CREATE PROCEDURE SP_UPDATEPASS(
		IN _id VARCHAR(200), IN _pass VARCHAR(200), IN _tipo VARCHAR(200)
	)
	BEGIN
		IF _tipo = "clientes" THEN
			UPDATE clientes SET
				pass = _pass
			WHERE idcliente = _id;
		END IF;
		IF _tipo = "bloques" THEN
			UPDATE bloques SET
				pass = _pass
			WHERE idbloque = _id;
		END IF;
		IF _tipo = "sucursales" THEN
			UPDATE sucursales SET
				pass = _pass
			WHERE idsucursal = _id;
		END IF;
		IF _tipo = "proveedores" THEN
			UPDATE proveedores SET
				pass = _pass
			WHERE idproveedor = _id;
		END IF;
		IF _tipo = "usuarios" THEN
			UPDATE usuarios SET
				password = _pass
			WHERE id = _id;
		END IF;
	END $$
	DELIMITER ;