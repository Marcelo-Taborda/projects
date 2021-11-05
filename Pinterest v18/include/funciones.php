<?php
function mostrar($d1, $d2, $d3){
            echo '<article>
            <figure>
            <a href="ver_imagen.php?link='.$d1.'&tags_imagen='.$d2.'"><img loading="lazy" src="'.$d3.'"></a>
            <div class="descripcion">
            <figcaption><p>0</p><i class="fas fa-thumbs-up icono_like"></i><a target="_blank" class="descargar_imagen" href="'.$d1.'" download><i class="fas fa-download icono_descarga"></i></a><p>0</p></figcaption>
            </div>
            </figure>
            </article>';
        }
?>