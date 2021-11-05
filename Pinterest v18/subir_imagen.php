<!DOCTYPE html>
<html>
<head>
	<title>Alex Kun - Subir Imagen</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="https://kit.fontawesome.com/c255495f41.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/subir_imagen.css">
	
</head>
<body>
<?php include ("include/header.php");?>

<section class="principal">
	<section class="article">
		<div id="imagePreview" class="imagePreview">
			<div id="prev"><i class="fas fa-camera"></i></div>
		</div>
		<div class="ingresar_imagen">
			<h2>Subir Imagen</h2>
			<form action="include/imagen.php" method="POST" enctype="multipart/form-data">
				<div class="label"><label>Ingresar Tags: 
				<input type="text" name="tags" placeholder="anime, amor, chica, ..." id="input_tag"></label></div>
				<input type="file" name="imagen" id="input_imagen" accept=".png, .jpeg, .jpg, .gif, .webp" multiple required>
				<input type="submit" name="enviar" value="Subir!" id="boton_imagen">
				<?php
				if (isset($_REQUEST["info"])) {
					$info=$_REQUEST["info"];
					echo '<p>'.$info.'</p>';
				}
				?>	
			</form>
		</div>
	</section>
</section>

<footer>
	<b><p>Alex Kun Proyect - All Rights Reserved 2020</p></b>
</footer>

<script type="text/javascript" src="js/previsualizar.js"></script>
</body>
</html>