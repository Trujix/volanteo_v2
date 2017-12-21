<div class="col-md-3 left_col">
	<div class="left_col scroll-view">

		<div class="navbar nav_title" style="border: 0;">
			<a href="#" class="site_title">
				<i class="fa fa-envelope"></i> 
				<span>Volanteo</span>
			</a>
		</div>
		<div class="clearfix"></div>

		<!-- menu prile quick info -->
		<div class="profile">
			<div class="profile_pic">
				<img src="images/logo.jpg" alt="..." class="img-circle profile_img">
			</div>
			<div class="profile_info">
				<span>Bienvenido,</span>
				<h2><?php echo $_SESSION['name']; ?></h2>
			</div>
		</div>
		<!-- /menu prile quick info -->

		<br />

		<!-- sidebar menu -->
		<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

		<div class="menu_section">
			<h3>General</h3>
			<ul class="nav side-menu">
				<li>
					<a href="clientes.php">
						<i class="fa fa-edit"></i> Clientes
					</a>
				</li>
				<li>
					<a href="proveedores.php">
						<i class="fa fa-th-large"></i> Proveedores
					</a>
				</li>
				<li>
					<a>
						<i class="fa fa-users"></i> 
						Trabajos 
						<span class="fa fa-chevron-down"></span>
					</a>
					<ul class="nav child_menu">
						<li>
							<a role="button" onclick="llamarEditarTrabajo('NUEVO','-')">Nuevo</a>
						</li>
						<li>
							<a href="ver-trabajos.php">Ver todos</a>
						</li>
					</ul>
                </li>
                <li>
					<a href="seguimiento.php">
						<i class="fa fa-eye"></i> Seguimiento
					</a>
				</li>
				<li>
					<a href="poligonos.php">
						<i class="fa fa-map"></i> Poligonos
					</a>
				</li>
				<li>
					<a href="encuestas.php">
						<i class="fa fa-pencil"></i> Encuestas
					</a>
				</li>
				<li>
					<a href="configuracion.php">
						<i class="fa fa-wrench"></i> Configuración
					</a>
				</li>
			</ul>
		</div>
		</div>
		<!-- /sidebar menu -->
	</div>
</div>