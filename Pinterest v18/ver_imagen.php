<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Kun</title>
    <link rel="stylesheet" type="text/css" href="css/ver_imagen.css">
</head>
<body>
<?php include ("include/header.php");?>

<section class="principal">
    <section class="articles">
    <?php
        $link=$_REQUEST["link"];
        $tags_imagen=explode(",", $_REQUEST["tags_imagen"]);
        echo '<figure>
                <div class="imagen"><a target="_blank" href="'.$link.'"><img loading="lazy" src="'.$link.'"></a></div> 
                <div class="descripcion">
                    <h2>Tags: </h2>';
                    foreach ($tags_imagen as $key => $valor) {
                        echo '<a href="#" class="tag">'.$valor.'</a>';
                    }
        echo '  </div>
            </figure>';
    ?>
    </section>
</section>

<footer>
    <b><p>Alex Kun Proyect - All Rights Reserved 2020</p></b>
</footer>
</body>
</html>