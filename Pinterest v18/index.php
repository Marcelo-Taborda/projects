<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-5">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alex Kun</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <?php include ("include/header.php");?>
    <section class="principal">
    <section class="articles">
    <?php
        include ("include/funciones.php");
        include ("include/conexion.php");
        if (isset($_REQUEST["buscar"])) {
            $trozos=explode(" ",$_REQUEST["buscar"]);
            $numero=count($trozos);
            $guardar=array();
            $busqueda = $_REQUEST["buscar"];
            if ($busqueda != " "){
                for ($a=0; $a < $numero; $a++) { 
                    $cadbusca="SELECT * FROM imagenes WHERE tags LIKE '%$trozos[$a]%'";
                    $result=mysqli_query($conectar, $cadbusca);
                    While($row=mysqli_fetch_array($result)) { 
                        $contador = count($guardar);
                        if ($numero == 1) {
                            mostrar($row["imagen"], $row["tags"], $row["resize"]);             
                        } else if ($numero-1 == $a) {
                            $cont=0;
                            for ($c=0; $c < $contador; $c++) { 
                                if ($guardar[$c] == $row["imagen"]) {
                                    $cont++;
                                    if ($cont == 1) {
                                        mostrar($row["imagen"], $row["tags"], $row["resize"]);
                                    }
                                }
                            }
                        } 
                        array_push($guardar, $row["imagen"]);
                    }
                }
            }
        } else {
            $sql="SELECT * FROM `imagenes` ORDER BY RAND()";
            $result=mysqli_query($conectar,$sql);
            while ($row=mysqli_fetch_array($result)){
                mostrar($row["imagen"], $row["tags"], $row["resize"]);
            }
        }
    ?>
    </section>
    </section>
    <footer>
    <b><p>Alex Kun Proyect - All Rights Reserved 2020</p></b>
    </footer>
</body>
</html>