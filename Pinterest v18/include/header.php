<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Kun</title>
    <script src="https://kit.fontawesome.com/c255495f41.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/header.css">
</head>
<body>
    
    <section class="header">
        <div class="icono_navegacion" id="icono_navegacion"><i class="fas fa-bars"></i></div>

        <div class="x3">
            <div class="titulo"><a href="index.php">ALEX KUN</a></div>

            <div class="buscador" id="buscador">
                <form action="index.php" method="get" class="form_buscador">
                <?php 
                        if (isset($_REQUEST["buscar"])) {
                            $busqueda = strtolower($_REQUEST["buscar"]);
                        }else {
                            $busqueda = null;
                        }
                    ?>
                    <input type="search" id="search" placeholder="Buscar..." name="buscar" value="<?php echo $busqueda; ?>" required>
                    <button class="icono_buscador"><i class="fa fa-search"></i></button>
                </form>
            </div>

            <nav class="navegacion ocultar_opciones" id="navegacion">
                <ul class="lista" >
                    <li><a href="#" id="enlace_1">MIS IMAGENES <i class="fas fa-camera"></i></a></li>
                
                    <li><a href="#" id="enlace_2">GALERIA <i class="far fa-images"></i></a></li>
                    
                    <li><a href="subir_imagen.php" id="enlace_3">SUBIR IMAGEN <i class="fas fa-file-upload"></i></a></li>
                </ul>
            </nav>
        </div>

        <div class="login">
            <a href="#" class="entrar"><i class="fas fa-sign-in-alt"></i></a>
            <a href="#" class="salir" ><i class="fas fa-sign-out-alt"></i></a>
		</div>
    </section>
    <script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
    <script type="text/javascript" src="js/header.js"></script>
</body>
</html>