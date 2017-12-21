<?php include('includes/header_index.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Volanteo</title>
    <link rel="icon" href="images/logo.ico?v=2" type="image/x-icon" />

    <!-- Bootstrap core CSS -->

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/icheck/flat/green.css" rel="stylesheet">

    <link href="plugins/CustomAlerts/css/jquery-confirm.css" rel="stylesheet">
    <link href="plugins/pnotify/pnotify.custom.min.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>
    <script src="plugins/pnotify/pnotify.custom.min.js"></script>
    <script src="plugins/toast/jquery.dreamalert.js"></script>
    <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
    <script src="js/main.js"></script>


</head>

<body style="background:#F7F7F7;">

    <div class="">
        <a class="hiddenanchor" id="toregister"></a>
        <a class="hiddenanchor" id="tologin"></a>
        <!-- Para guardar temporarlmente el resultado del geocode -->
        <p id="geocode" hideen></p> 

        <div id="wrapper">
            <div id="login" class="animate form">
                <section class="login_content">
                    <form>
                        <h1>
                            <i class="fa fa-envelope" style="font-size: 26px;"></i> Volanteo
                        </h1>

                        <div>
                            <input type="text" class="form-control" id="user" placeholder="Usuario" required="" />
                        </div>
                        <div>
                            <input type="password" class="form-control" id="pass" placeholder="Contraseña" required="" />
                        </div>
                        <div>
                            <input class="btn btn-default submit btnLogin-mio" style="margin-left: 0;width: 100%;" type="submit" value="Iniciar sesión" id="btn_login">
                            <!-- <a class="reset_pass" href="#">¿Olvidaste tu contraseña?</a> -->
                        </div>

                        <div class="clearfix"></div>
                        <div class="separator">

                            <!-- <p class="change_link">¿Eres nuevo?
                                <a href="#toregister" class="to_register"> Crea una cuenta </a>
                            </p> -->
                            <div class="clearfix"></div>

                        </div>
                    </form>
                  <!-- form -->
                </section>
            <!-- content -->
            </div>
            <div id="register" class="animate form">
                <section class="login_content">
                    <form>
                        <h1>Crea una cuenta</h1>
                        <div>
                            <input type="text" id="reg_user" class="form-control" placeholder="Usuario" required="" />
                        </div>
                        <div>
                            <input type="email" id="reg_email" class="form-control" placeholder="Correo Electronico" required="" />
                        </div>
                        <div>
                            <input type="password" id="reg_pass" class="form-control" placeholder="Contraseña" required="" />
                        </div>
                        <div>
                            <input class="btn btn-default submit" type="submit" value="Registrarse" id="btn_registro">
                        </div>

                        <div class="clearfix"></div>

                        <div class="separator">

                            <p class="change_link">¿Ya estas registrado?
                                <a href="#tologin" class="to_register"> Iniciar Sesión </a>
                            </p>
                            <div class="clearfix"></div>

                        </div>
                    </form>
                <!-- form -->
                </section>
            <!-- content -->
            </div>
        </div>
    </div>
    
    <script src="js/index.js"></script>

</body>

</html>
