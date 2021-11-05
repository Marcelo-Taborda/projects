
function tablero() {
    var tablero = document.getElementById("tablero");
    var colorCelda = "";
    var array2D = []
    var idNumber = 0;
    for (let a = 0; a < 8; a++) {
        if (a % 2 === 0) {
            colorCelda = "blanco";
        } else {
            colorCelda = "negro";
        }
        var array1D = []
        for (let b = 0; b < 8; b++) {
            var celda = document.createElement("div");
            celda.className = colorCelda;
            celda.id = idNumber;
            tablero.appendChild(celda)
            celda.onclick = function() {
                /* console.log(a +" - "+ b) */
                identificarLugarPieza(a, b);
            }
            array1D.push(document.getElementById(idNumber));
            if (colorCelda === "blanco") {
                colorCelda = "negro";
            } else {
                colorCelda = "blanco";
            }
            idNumber++;
        }
        array2D.push(array1D);
    }
    /* console.log(array2D) */
    agregarPiezas();
}

const piezas = ["torre", "caballo", "alfil", "reina", "rey", "peon"];
const blancas = ["♖", "♘", "♗", "♕", "♔", "♙"];
const negras = ["♜", "♞", "♝", "♛", "♚", "♟"];
var piezaSeleccionada = [];
var turno = "blanco";
var jugadaPasada = [0,0];

function agregarPiezas() {
    for (let a = 0; a < 5; a++) {
        document.getElementById(a).innerHTML = negras[a];
        if (a === 0) {
            document.getElementById(7).innerHTML = negras[a];
        } else if (a === 1) {
            document.getElementById(6).innerHTML = negras[a];
        } else if (a === 2) {
            document.getElementById(5).innerHTML = negras[a];
        }
        if (a === 4) {
            for (let a = 8; a < 16; a++) {
                document.getElementById(a).innerHTML = negras[5];
            }
        }
    }

    for (let a = 56; a < 61; a++) {
        document.getElementById(a).innerHTML = blancas[a-56];
        if (a === 56) {
            document.getElementById(63).innerHTML = blancas[a-56];
        } else if (a === 57) {
            document.getElementById(62).innerHTML = blancas[a-56];
        } else if (a === 58) {
            document.getElementById(61).innerHTML = blancas[a-56];
        }
        if (a === 58) {
            for (let a = 48; a < 56; a++) {
                document.getElementById(a).innerHTML = blancas[5];
            }
        }
    }
}

function identificarLugarPieza(x, y) {
    var idCasilla = 8*x+y;
    var casilla = document.getElementById(idCasilla).textContent;
    if (casilla === "" || window.getComputedStyle(document.getElementById(8*x+y)).getPropertyValue("background-color") === "rgb(65, 105, 225)") {
        addToCasillaVacia(x, y);
    } else {
        for (let a = 0; a < piezas.length; a++) {
            if (casilla === blancas[a] || casilla === negras[a]) {
                if (casilla === blancas[a]) {
                    color = "B";
                } else {
                    color = "N"
                }
                piezaSeleccionada = [casilla, 8*x+y];
                dirigirPiezas(piezas[a], x, y, color);
            }
        }
    }
}

function dirigirPiezas(pieza, x, y, color) {
    switch (pieza) {
        case "torre":
            torreMovimiento(x, y, color);
            break;
        case "caballo":
            caballoMovimiento(x, y, color);
            break;
        case "alfil":
            alfilMovimiento(x, y, color);
            break;
        case "reina":
            reinaMovimiento(x, y, color);
            break;
        case "rey":
            reyMovimiento(x, y, color);
            break;
        case "peon":
            peonMovimiento(x, y, color);
            break;
    }
}
//ALT+15
function torreMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && x-cont >= 0 && !esBlanca) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esNegra) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && x+cont <= 7 && !esBlanca) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esNegra) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && y+cont <= 7 && !esBlanca) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esNegra) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && y-cont >= 0 && !esBlanca) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esNegra) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    } else if (color === "N" && turno === "negro") {
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && x-cont >= 0 && !esNegra) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esBlanca) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && x+cont <= 7 && !esNegra) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esBlanca) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && y+cont <= 7 && !esNegra) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esBlanca) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && y-cont >= 0 && !esNegra) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esBlanca) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    }
}

function caballoMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        mas2 = 2;
        mas1 = 1;
        //ARRIBA
        if (x-mas2 >= 0) {
            esBlanca = false;
            if (y+mas1 <=7) {
                avanzarArribaDer = document.getElementById(8*(x-mas2)+(y+mas1));
                for (let a = 0; a < blancas.length; a++) {
                    if (avanzarArribaDer.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    avanzarArribaDer.style.backgroundColor = "royalblue";
                }
            }

            esBlanca = false;
            if (y-mas1 >= 0) {
                avanzarArribaIzq = document.getElementById(8*(x-mas2)+(y-mas1));
                for (let a = 0; a < blancas.length; a++) {
                    if (avanzarArribaIzq.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    avanzarArribaIzq.style.backgroundColor = "royalblue";
                }
            }
        }
        //DERECHA
        if (y+mas2 <= 7) {
            esBlanca = false;
            if (x-mas1 >= 0) {
                derArr = document.getElementById(8*(x-mas1)+(y+mas2));
                for (let a = 0; a < blancas.length; a++) {
                    if (derArr.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    derArr.style.backgroundColor = "royalblue";
                }
            }

            esBlanca = false;
            if (x+mas1 <= 7) {
                arrAba = document.getElementById(8*(x+mas1)+(y+mas2));
                for (let a = 0; a < blancas.length; a++) {
                    if (arrAba.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    arrAba.style.backgroundColor = "royalblue";
                }
            }
        }
        //ABAJO
        if (x+mas2 <= 7) {
            esBlanca = false;
            if (y+mas1 <=7) {
                abaDer = document.getElementById(8*(x+mas2)+(y+mas1));
                for (let a = 0; a < blancas.length; a++) {
                    if (abaDer.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    abaDer.style.backgroundColor = "royalblue";
                }
            }

            esBlanca = false;
            if (y-mas1 >= 0) {
                abaIzq = document.getElementById(8*(x+mas2)+(y-mas1));
                for (let a = 0; a < blancas.length; a++) {
                    if (abaIzq.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    abaIzq.style.backgroundColor = "royalblue";
                }
            }
        }
        //Izquieda
        if (y-mas2 >= 0) {
            esBlanca = false;
            if (x-mas1 >= 0) {
                izqArr = document.getElementById(8*(x-mas1)+(y-mas2));
                for (let a = 0; a < blancas.length; a++) {
                    if (izqArr.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    izqArr.style.backgroundColor = "royalblue";
                }
            }

            esBlanca = false;
            if (x+mas1 <= 7) {
                izqAba = document.getElementById(8*(x+mas1)+(y-mas2));
                for (let a = 0; a < blancas.length; a++) {
                    if (izqAba.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca) {
                    izqAba.style.backgroundColor = "royalblue";
                }
            }
        }
    } else if (color === "N" && turno === "negro") {
        mas2 = 2;
        mas1 = 1;
        //ARRIBA
        if (x-mas2 >= 0) {
            esNegra = false;
            if (y+mas1 <=7) {
                avanzarArribaDer = document.getElementById(8*(x-mas2)+(y+mas1));
                for (let a = 0; a < negras.length; a++) {
                    if (avanzarArribaDer.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    avanzarArribaDer.style.backgroundColor = "royalblue";
                }
            }

            esNegra = false;
            if (y-mas1 >= 0) {
                avanzarArribaIzq = document.getElementById(8*(x-mas2)+(y-mas1));
                for (let a = 0; a < negras.length; a++) {
                    if (avanzarArribaIzq.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    avanzarArribaIzq.style.backgroundColor = "royalblue";
                }
            }
        }
        //DERECHA
        if (y+mas2 <= 7) {
            esNegra = false;
            if (x-mas1 >= 0) {
                derArr = document.getElementById(8*(x-mas1)+(y+mas2));
                for (let a = 0; a < negras.length; a++) {
                    if (derArr.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    derArr.style.backgroundColor = "royalblue";
                }
            }

            esNegra = false;
            if (x+mas1 <= 7) {
                arrAba = document.getElementById(8*(x+mas1)+(y+mas2));
                for (let a = 0; a < negras.length; a++) {
                    if (arrAba.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    arrAba.style.backgroundColor = "royalblue";
                }
            }
        }
        //ABAJO
        if (x+mas2 <= 7) {
            esNegra = false;
            if (y+mas1 <=7) {
                abaDer = document.getElementById(8*(x+mas2)+(y+mas1));
                for (let a = 0; a < negras.length; a++) {
                    if (abaDer.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    abaDer.style.backgroundColor = "royalblue";
                }
            }

            esNegra = false;
            if (y-mas1 >= 0) {
                abaIzq = document.getElementById(8*(x+mas2)+(y-mas1));
                for (let a = 0; a < negras.length; a++) {
                    if (abaIzq.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    abaIzq.style.backgroundColor = "royalblue";
                }
            }
        }
        //Izquieda
        if (y-mas2 >= 0) {
            esNegra = false;
            if (x-mas1 >= 0) {
                izqArr = document.getElementById(8*(x-mas1)+(y-mas2));
                for (let a = 0; a < negras.length; a++) {
                    if (izqArr.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    izqArr.style.backgroundColor = "royalblue";
                }
            }

            esNegra = false;
            if (x+mas1 <= 7) {
                izqAba = document.getElementById(8*(x+mas1)+(y-mas2));
                for (let a = 0; a < negras.length; a++) {
                    if (izqAba.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra) {
                    izqAba.style.backgroundColor = "royalblue";
                }
            }
        }
    }
}

function alfilMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    } else if (color === "N" && turno === "negro") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    }
}

function reinaMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    } else if (color === "N" && turno === "negro") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        while (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    }
    
    if (color === "B" && turno === "blanco") {
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && x-cont >= 0 && !esBlanca) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esNegra) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && x+cont <= 7 && !esBlanca) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esNegra) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && y+cont <= 7 && !esBlanca) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esNegra) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        while (!esNegra && y-cont >= 0 && !esBlanca) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esNegra) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    } else if (color === "N" && turno === "negro") {
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && x-cont >= 0 && !esNegra) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esBlanca) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && x+cont <= 7 && !esNegra) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esBlanca) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && y+cont <= 7 && !esNegra) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esBlanca) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        while (!esBlanca && y-cont >= 0 && !esNegra) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esBlanca) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    }
}

function reyMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        cont = 1;
        esNegra = false;
        esBlanca = false;
        if (!esNegra && x-cont >= 0 && !esBlanca) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esNegra) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        if (!esNegra && x+cont <= 7 && !esBlanca) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esNegra) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        if (!esNegra && y+cont <= 7 && !esBlanca) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esNegra) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esNegra = false;
        esBlanca = false;
        if (!esNegra && y-cont >= 0 && !esBlanca) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esNegra) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    } else if (color === "N" && turno === "negro") {
        cont = 1;
        esBlanca = false;
        esNegra = false;
        if (!esBlanca && x-cont >= 0 && !esNegra) {
            avanzarArriba = document.getElementById(8*(x-cont)+y);
            if (avanzarArriba.textContent === "") {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarArriba.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarArriba.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarArriba.textContent !== "" && esBlanca) {
                avanzarArriba.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        if (!esBlanca && x+cont <= 7 && !esNegra) {
            avanzarAbajo = document.getElementById(8*(x+cont)+y);
            if (avanzarAbajo.textContent === "") {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarAbajo.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarAbajo.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarAbajo.textContent !== "" && esBlanca) {
                avanzarAbajo.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        if (!esBlanca && y+cont <= 7 && !esNegra) {
            avanzarDerecha = document.getElementById(8*x+y+cont);
            if (avanzarDerecha.textContent === "") {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarDerecha.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarDerecha.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarDerecha.textContent !== "" && esBlanca) {
                avanzarDerecha.style.backgroundColor = "royalblue";
            }
            cont++;
        }
        cont = 1;
        esBlanca = false;
        esNegra = false;
        if (!esBlanca && y-cont >= 0 && !esNegra) {
            avanzarIzquierda = document.getElementById(8*x+y-cont);
            if (avanzarIzquierda.textContent === "") {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            for (let a = 0; a < blancas.length; a++) {
                if (avanzarIzquierda.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (avanzarIzquierda.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (avanzarIzquierda.textContent !== "" && esBlanca) {
                avanzarIzquierda.style.backgroundColor = "royalblue";
            }
            cont++;
        }
    }

    if (color === "B" && turno === "blanco") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    } else if (color === "N" && turno === "negro") {
        //ARRIVA A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x-mas1 >= 0 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            arrDer = document.getElementById(8*(x-mas1)+y+mas1);
            arrDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrDer.textContent === negras[a]) {
                    esNegra = true;
                    arrDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ARRIVA A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x-mas1 >= 0 && y-mas1 >= 0 && !esBlanca && !esNegra) {
            arrIzq = document.getElementById(8*(x-mas1)+y-mas1);
            arrIzq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (arrIzq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (arrIzq.textContent === negras[a]) {
                    esNegra = true;
                    arrIzq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA DERECHA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x+mas1 <= 7 && y+mas1 <= 7 && !esNegra && !esBlanca) {
            abaDer = document.getElementById(8*(x+mas1)+y+mas1);
            abaDer.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaDer.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaDer.textContent === negras[a]) {
                    esNegra = true;
                    abaDer.style.backgroundColor = "";
                }
            }
            mas1++;
        }
        //ABAJO A LA IZQUIERDA
        mas1 = 1;
        esBlanca = false;
        esNegra = false;
        if (x+mas1 <=7 && y-mas1 >=0 && !esBlanca && !esNegra) {
            abaizq = document.getElementById(8*(x+mas1)+y-mas1);
            abaizq.style.backgroundColor = "royalblue";
            for (let a = 0; a < blancas.length; a++) {
                if (abaizq.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (abaizq.textContent === negras[a]) {
                    esNegra = true;
                    abaizq.style.backgroundColor = "";
                }
            }
            mas1++;
        }
    }
}

function peonMovimiento(x, y, color) {
    resetColores();
    if (color === "B" && turno === "blanco") {
        //HACIA ARRIBA
        mas1 = 1;
        esNegra = false;
        esBlanca = false;
        if (x-mas1 >= 0) {
            peonUp = document.getElementById(8*(x-mas1)+y);
            for (let a = 0; a < negras.length; a++) {
                if (peonUp.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            for (let a = 0; a < blancas.length; a++) {
                if (peonUp.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (!esNegra && !esBlanca) {
                peonUp = document.getElementById(8*(x-mas1)+y);
                peonUp.style.backgroundColor = "royalblue"
                peonUp = document.getElementById(8*(x-mas1-1)+y);
                for (let a = 0; a < blancas.length; a++) {
                    if (peonUp.textContent === blancas[a]) {
                        esBlanca = true;
                    }
                }
                if (!esBlanca && x === 6) {
                    peonUp = document.getElementById(8*(x-mas1-1)+y);
                    peonUp.style.backgroundColor = "royalblue"
                }
            }
            esNegra = false;
            peonUpLeft = document.getElementById(8*(x-1)+y-1);
            for (let a = 0; a < negras.length; a++) {
                if (peonUpLeft.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (y-1 >= 0 && esNegra) {
                peonUpLeft.style.backgroundColor = "royalblue"
            }
            esNegra = false;
            peonUpRight = document.getElementById(8*(x-1)+y+1);
            for (let a = 0; a < negras.length; a++) {
                if (peonUpRight.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (y+1 <=7 && esNegra) {
                peonUpRight.style.backgroundColor = "royalblue"
            }
        }
    } else if (color === "N" && turno === "negro") {
        //HACIA ARRIBA
        mas1 = 1;
        esNegra = false;
        esBlanca = false;
        if (x+mas1 <= 7) {
            peonUp = document.getElementById(8*(x+1)+y);
            for (let a = 0; a < blancas.length; a++) {
                if (peonUp.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            for (let a = 0; a < negras.length; a++) {
                if (peonUp.textContent === negras[a]) {
                    esNegra = true;
                }
            }
            if (!esBlanca && !esNegra) {
                peonUp = document.getElementById(8*(x+1)+y);
                peonUp.style.backgroundColor = "royalblue"
                peonUp = document.getElementById(8*(x+1+1)+y);
                for (let a = 0; a < negras.length; a++) {
                    if (peonUp.textContent === negras[a]) {
                        esNegra = true;
                    }
                }
                if (!esNegra && x === 1) {
                    peonUp = document.getElementById(8*(x+1+1)+y);
                    peonUp.style.backgroundColor = "royalblue"
                }
            }
            esBlanca = false;
            peonUpLeft = document.getElementById(8*(x+1)+y-1);
            for (let a = 0; a < blancas.length; a++) {
                if (peonUpLeft.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (y-1 >= 0 && esBlanca) {
                peonUpLeft.style.backgroundColor = "royalblue"
            }
            esBlanca = false;
            peonUpRight = document.getElementById(8*(x+1)+y+1);
            for (let a = 0; a < blancas.length; a++) {
                if (peonUpRight.textContent === blancas[a]) {
                    esBlanca = true;
                }
            }
            if (y+1 <=7 && esBlanca) {
                peonUpRight.style.backgroundColor = "royalblue"
            }
        }
    }
}

function addToCasillaVacia(x, y) {
    colorCasilla = window.getComputedStyle(document.getElementById(8*x+y)).getPropertyValue("background-color");
    if (colorCasilla === "rgb(65, 105, 225)") {
        document.getElementById(8*x+y).innerHTML = piezaSeleccionada[0];
        document.getElementById(piezaSeleccionada[1]).innerHTML = "";
        /* resetColores() */
        if (turno === "blanco") {
            turno = "negro";
            rotar(180);
        } else {
            turno = "blanco";
            rotar(0);
        }
        resetColores()
        guardarJugadaAnterior(piezaSeleccionada[1], x*8+y);
    }
   
}

function guardarJugadaAnterior(id1, id2) {
    jugadaPasada[0] = document.getElementById(id1);
    jugadaPasada[1] = document.getElementById(id2);
    resetColores();
}

function resetColores() {
    for (let a = 0; a < 64; a++) {
        document.getElementById(a).style.backgroundColor = "";
    }
    if (jugadaPasada[0] != 0) {
        jugadaPasada[0].style.backgroundColor = "lightblue";
        jugadaPasada[1].style.backgroundColor = "lightblue";
    }
}

function rotar(rotacion) {
    switch (rotacion) {
        case 180:
            document.getElementById("tablero").style.transform = "rotate(180deg)"
            for (let a = 0; a < 32; a++) {
                document.getElementsByClassName("blanco")[a].style.transform = "rotate(180deg)"
                document.getElementsByClassName("negro")[a].style.transform = "rotate(180deg)"
            }
            break;
        case 0:
            document.getElementById("tablero").style.transform = "rotate(0deg)"
            for (let a = 0; a < 32; a++) {
                document.getElementsByClassName("negro")[a].style.transform = "rotate(0deg)"
                document.getElementsByClassName("blanco")[a].style.transform = "rotate(0deg)"
            }
            break;
        default:
            break;
    }
}