<?php
//cadena de conexion
include ("conexion.php");
// DEBO PREPARAR LOS TEXTOS QUE VOY A BUSCAR si la cadena existe
$busqueda = $_REQUEST["buscar"];
if ($busqueda != "+"){
  //CUENTA EL NUMERO DE PALABRAS
  $trozos=explode("+",$busqueda);
  $numero=count($trozos);
  if ($numero==1) {
    //SI SOLO HAY UNA PALABRA DE BUSQUEDA SE ESTABLECE UNA INSTRUCION CON LIKE
    $cadbusca="SELECT * FROM imagenes WHERE tags LIKE  '%$busqueda%' ";
  } elseif ($numero>1) {
    //SI HAY UNA FRASE SE UTILIZA EL ALGORTIMO DE BUSQUEDA AVANZADO DE MATCH AGAINST
    //busqueda de frases con mas de una palabra y un algoritmo especializado
    $cadbusca="SELECT * FROM imagenes WHERE MATCH(tags) AGAINST ('$busqueda') ";
  }
  $result=mysqli_query($conectar, $cadbusca);
  $row=mysqli_fetch_array($result);
  While($row=mysqli_fetch_array($result))
  {
    //Mostramos los titulos de los articulos o lo que deseemos...
    echo $row["tags"]." //// ".$row["imagen"]."<br>";
    header("Location: ../index.php?info=$row");
  }


  
  /*While($row=mysqli_fetch_object($result))
  {
    //Mostramos los titulos de los articulos o lo que deseemos...
    $referencia=$row->tags;
    $titulo=$row->imagen;
    echo $referencia." //// ".$titulo."<br>";
  }*/
}
?>