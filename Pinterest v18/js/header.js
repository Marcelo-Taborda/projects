//------------------------- Menu Despegable ---------------------------------

var ocultar_mostrar = true;

$('#icono_navegacion').click(function(){
	if (ocultar_mostrar) {
		ocultar_mostrar = false;
        $('#navegacion').removeClass('ocultar_opciones');
        $('.icono_navegacion').addClass('rotar_icono');
    }else {
        ocultar_mostrar = true;
        $('#navegacion').addClass('ocultar_opciones');
        $('#icono_navegacion').removeClass('rotar_icono');
    }
});