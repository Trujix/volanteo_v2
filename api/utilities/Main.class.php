<?php  
	/**

	* 

	*/

	class Main{
	    const AUTH = "C0s1T3c!2ol7$";
		public function log($texto){
			$myfile = fopen("log.txt", "a") or die("Unable to open file!");
			$txt = "
			$texto\n";
			fwrite($myfile, $txt);
			fclose($myfile);
		}

		public function authorization(){
			$headers = apache_request_headers();
			// foreach ($headers as $key => $value) {
			// 	self::log($key.": ".$value);
			// }
		    $bandera = FALSE;
		    if (isset($headers["Cositec"])) 
		        if($headers["Cositec"] == self::AUTH)
		        	$bandera = TRUE;
		    return $bandera;
		}

		public function base64_to_jpeg($base64_string, $service, $name) {
			// $dir = "evidencias/{$service}";
			// if(!is_dir($dir)) 
        		// mkdir($dir, 0766);
        	// $dirName = $dir.'/'.$name;
        	echo $base64_string;
		    $ifp = fopen("../{$name}", "wb"); 
		    // $data = explode(',', $base64_string);
		    fwrite($ifp, base64_decode($base64_string)); 
		    fclose($ifp); 
		    return $name; 
		}

	}

?>