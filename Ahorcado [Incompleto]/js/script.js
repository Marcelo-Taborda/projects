
function cantidadJugadores(cantidad) {
    if (cantidad === 2) {
        document.getElementById("ingresarPalabra").style.display = "block"
        document.getElementById("jugadores").style.display = "none"
    } else {
        document.getElementById("jugadores").style.display = "none"
        agregarPalabra();
    }
}

function agregarPalabra() {
    var inputPalabra = document.getElementById("palabra");
    var palabra = inputPalabra.value;
    if (palabra) {
        var ingresarPalabra = document.getElementById("ingresarPalabra");
        if (inputPalabra.value === "") {
            inputPalabra.style.border = "2px solid red"
        } else {
            var letras = "qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"
            var todoOk = true
            for (let a = 0; a < palabra.length; a++) {
                const element = palabra[a];
                if (!letras.includes(element)) {
                    todoOk = false;
                }
            }
            if (todoOk) {
                inputPalabra.style.display = "none"
                ingresarPalabra.style.display = "none"
                agregarTeclado(armarJuego(palabra));
            } else {
                inputPalabra.value = ""
                inputPalabra.placeholder = "Solo puede ingresar letras."
            }
        }
    } else if (!palabra){
        palabra = "mariano"
        agregarTeclado(armarJuego(palabra));
    }
}

function armarJuego(palabra) {
    const div = document.createElement("div");
    div.id = "mostrarPalabra";
    document.getElementById("ahorcado").appendChild(div)
    for (let a = 0; a < palabra.length; a++) {
        const element = palabra[a].toUpperCase();
        const div = document.createElement("div");
        div.className = "palabra";
        div.innerHTML = "<span class='ocultar'>"+ element +"</span>"
        document.getElementById("mostrarPalabra").appendChild(div)
    }
    return document.querySelectorAll("span");
}

function agregarTeclado(palabra) {
    alfabeto = "abcdefghijklmnñopqrstuvwxyz"
    const div = document.createElement("div");
    div.id = "letras";
    document.getElementById("ahorcado").appendChild(div)
    for (let a = 0; a < alfabeto.length; a++) {
        const element = alfabeto[a].toUpperCase();
        const div = document.createElement("div");
        div.className = "letra";
        div.innerHTML = "<span>"+ element +"</span>"
        div.onclick = function () {
            comprobarLetraEnPalabra(a, element, palabra);
        }
        document.getElementById("letras").appendChild(div)
    }
}
var error = 0;
var errorExist = true;
function comprobarLetraEnPalabra(indice, letra, palabra) {
    console.log("[" + indice + "] = " + letra + "Letra palabra: ")
    /* console.log(palabra[0]) */
    for (let a = 0; a < palabra.length; a++) {
        const element = palabra[a];
        console.log(element, letra)
        if (letra === element.textContent) {
            element.style.opacity = "1"
            errorExist = false;
        }
    }
    if (errorExist === true) {
        error++;
        switch (error) {
            case 1:
                document.getElementsByClassName("cabeza")[0].style.display = "block"
                break;
            case 2:
                document.getElementsByClassName("cuerpo")[0].style.display = "block"
                break;
            case 3:
                document.getElementsByClassName("brazoIzq")[0].style.display = "block"
                break;
            case 4:
                document.getElementsByClassName("brazoDer")[0].style.display = "block"
                break;
            case 5:
                document.getElementsByClassName("piernaDer")[0].style.display = "block"
                break;
            case 6:
                document.getElementsByClassName("piernaIzq")[0].style.display = "block"
                alert("Perdiste.")
                break;
        }
    }
    errorExist = true;
}