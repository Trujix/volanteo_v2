<?php  
	
	require_once("mysql.php");
    require_once("Main.class.php");

	class DBConnection extends Main{

        private static $dbCon = null;
        private static $db = null;

        final private function __construct(){
            self::conect();
        }

        public static function conect(){

            self::$dbCon = new mysqli(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

            if(self::$dbCon->connect_error)
                die("Error de Conexión (" . self::$dbCon->connect_error . ")" );
            else{
                self::$dbCon->set_charset("utf8");
                return self::$dbCon;
            }

        }


        public static function query($consult){

            $query = self::conect()->query($consult);

            if($query == true)
                return $query;
            else
                return null;
            
        }

        public function next_result(){
            self::conect()->next_result();
        }

        private function show_error(){
            return self::conect()->connect_error;
        }

        public function query_assoc($consult){
            $vec = array();

            if($result = self::query($consult)){
                while($fila = $result->fetch_assoc()){ $vec[] = $fila; }
                return $vec;
            }
        }

        public function query_row($consult){

            $vec = array();
            if($result = self::query($consult)){
                while($fila = $result->fetch_row()){ $vec[] = $fila; }
                return $vec;
            }
        }

        public function query_single_object($consult){
            
            if($result = self::query($consult))
                return $result->fetch_object();
        }

        public function exit_conect(){
            mysqli_close(self::conect());
        }

        public function destroy(){
            return session_destroy();
        }
     
    }


?>