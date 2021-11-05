<?php
	include ("conexion.php");
/*
foreach($_FILES["imagen"]["tmp_name"] as $key => $tmp_name){
	$filename = $_FILES["imagen"]["name"][$key];
	$source = $_FILES["imagen"]["tmp_name"][$key];
	$directorio = "../docs/".$filename;
    copy($source, $directorio);
}
*/
$extencion = pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION);

if ($extencion == "jpeg" || $extencion == "png" || $extencion == "webp" || $extencion == "gif" || $extencion == "jpg") {






	$tags=strtoupper($_REQUEST["tags"]);
    $foto_temp=$_FILES["imagen"]["tmp_name"];
    $new_name = time();
	$guardar="../images/"."image_".$new_name.".".$extencion;
	$ubicacion="images/"."image_".$new_name.".".$extencion;
    copy($foto_temp,$guardar);
	header("Location: ../index.php");

    function resizeImage($resourceType,$image_width,$image_height,$resizeWidth,$resizeHeight) {
        $imageLayer = imagecreatetruecolor($resizeWidth,$resizeHeight);
        imagecopyresampled($imageLayer,$resourceType,0,0,0,0,$resizeWidth,$resizeHeight, $image_width,$image_height);
        return $imageLayer;
    }

    $imageProcess = 0;
    if(is_array($_FILES)) {
        $new_width = 300;
        $sourceProperties = getimagesize($foto_temp);
        $uploadPath = "../images/resizes/";
        $uploadImageType = $sourceProperties[2];
        $sourceImageWidth = $sourceProperties[0];
        $sourceImageHeight = $sourceProperties[1];
        $new_height = ($new_width*$sourceImageHeight)/$sourceImageWidth;

        switch ($uploadImageType) {
            case IMAGETYPE_JPEG:
                $resourceType = imagecreatefromjpeg($foto_temp); 
                $imageLayer = resizeImage($resourceType,$sourceImageWidth,$sourceImageHeight,$new_width,$new_height);
                imagejpeg($imageLayer,$uploadPath."resize_".$new_name.'.'. $extencion);
                break;

            case IMAGETYPE_GIF:
                $resourceType = imagecreatefromgif($foto_temp); 
                $imageLayer = resizeImage($resourceType,$sourceImageWidth,$sourceImageHeight,$new_width,$new_height);
                imagegif($imageLayer,$uploadPath."resize_".$new_name.'.'. $extencion);
                break;

            case IMAGETYPE_PNG:
                $resourceType = imagecreatefrompng($foto_temp); 
                $imageLayer = resizeImage($resourceType,$sourceImageWidth,$sourceImageHeight,$new_width,$new_height);
                imagepng($imageLayer,$uploadPath."resize_".$new_name.'.'. $extencion);
                break;

            case IMAGETYPE_WEBP:
                $resourceType = imagecreatefromwebp($foto_temp); 
                $imageLayer = resizeImage($resourceType,$sourceImageWidth,$sourceImageHeight,$new_width,$new_height);
                imagewebp($imageLayer,$uploadPath."resize_".$new_name.'.'. $extencion);
                break;

            default:
                $imageProcess = 1;
                break;
        }

        $resize = "images/resizes/"."resize_".$new_name.".".$extencion;
        $verificado = 1;
        $sql="INSERT INTO imagenes (tags,resize,imagen,verificado) VALUES('$tags','$resize','$ubicacion','$verificado')";
        $ejecutar=mysqli_query($conectar, $sql);
        //move_uploaded_file($foto_temp, $uploadPath. $new_name. ".". $extencion);
        $imageProcess = 1;
    }
}else {
    header("Location: ../subir_imagen.php?info=Formato no soportado. Selecione una imagen 'jpeg', 'jpg', 'png', 'gif', 'webp'.");
}

#rename("/tmp/fichero_tmp.txt", "/home/user/login/docs/mi_fichero.txt");




$arr="SELECT imagen WHERE verificado = 0";
$cont = count($arr);
for ($z=0; $z < $cont ; $z++) { 
    $line = $arr[$z];
    #redimensionar_imagen($new_name, $line[0], 300, 300)
    $imagen_optimizada = redimensionar_imagen($new_name, $line[0], 300, 300);
    imagejpeg($imagen_optimizada, "images/include/"."resize_".$imagen_optimizada.".jpg");
}
function redimensionar_imagen($new_name, $rutaimg, $xmax, $ymax){   
  
    if($new_name == "jpg" || $new_name == "jpeg")  
        $imagen = imagecreatefromjpeg($rutaimg);  
    elseif($new_name == "png")  
        $imagen = imagecreatefrompng($rutaimg);  
    elseif($new_name == "gif")  
        $imagen = imagecreatefromgif($rutaimg);  
      
    $x = imagesx($imagen);  
    $y = imagesy($imagen);  
      
    if($x <= $xmax && $y <= $ymax){
        echo "<center>Esta imagen ya esta optimizada para los maximos que deseas.<center>";
        return $imagen;  
    }
  
    if($x >= $y) {  
        $nuevax = $xmax;  
        $nuevay = $nuevax * $y / $x;  
    }  
    else {  
        $nuevay = $ymax;  
        $nuevax = $x / $y * $nuevay;  
    }  
      
    $img2 = imagecreatetruecolor($nuevax, $nuevay);  
    imagecopyresized($img2, $imagen, 0, 0, 0, 0, floor($nuevax), floor($nuevay), $x, $y);  
    echo "<center>La imagen se ha optimizado correctamente.</center>";
    return $img2;   
}
/*$imagen_optimizada = redimensionar_imagen('imagen.jpg','images/imagen.jpg',700,700);
imagejpeg($imagen_optimizada, "images/imagen_optimizada.jpg");*/
?>


