resize();
window.onresize = resize;
function resize() {
    const tateti = document.getElementById("tateti");
    tateti.style.height = tateti.clientWidth + "px";
}
function cantJugadores(cant) {
    cantJug = cant;
    turno = "jugador1"
    mostarInfo();
}

var cantJug = 0;
var turno = "jugadorIndefinido";
var finalizar = false;
const jugadoresInfo = document.getElementById("jugadores");
const info = document.getElementById("uno");
const casillas = document.getElementById("tateti").children;

const matriz = drawMatriz();

function drawMatriz() {
    var saveMatriz = []
    for (let y = 0; y < 3; y++) {
        var saveX = []
        for (let x = 0; x < 3; x++) {
            const element = casillas[y+x*3];
            saveX.push(element);
            element.onclick = function () {
                turnos();
                mostarInfo();
                element.innerHTML = jugar();
                finalizar = ganador();
                if (info.textContent === "Pc" && finalizar === false) {
                    turnoPc();
                    turno = "jugador1"
                    mostarInfo()
                }
                finalizar = ganador();
                element.onclick = ""
            }
        }
        saveMatriz.push(saveX);
    }
    console.log(saveMatriz)
    return saveMatriz;
}

function turnos() {
    if (turno === "jugador1") {
        turno = "jugador2";
    } else if (turno === "jugador2") {
        turno = "jugador1";
    } else {
        turno = "jugador2";
        cantJug = 1;
    }
}

function mostarInfo() {
    info.style.cursor = "default";
    info.style.pointerEvents = "none";
    if (cantJug === 1) {
        if (turno === "jugador1") {
            info.textContent = "Usuario"
            jugadoresInfo.innerHTML = "Turno: " + info.outerHTML;
        } else if (turno === "jugador2") {
            info.textContent = "Pc"
            jugadoresInfo.innerHTML = "Turno: " + info.outerHTML;
        }
    } else if (cantJug === 2) {
        if (turno === "jugador1") {
            info.textContent = "jugador 1"
            jugadoresInfo.innerHTML = "Turno: " + info.outerHTML;
        } else {
            info.textContent = "Jugador 2"
            jugadoresInfo.innerHTML = "Turno: " + info.outerHTML;
        }
    }
}

function jugar() {
    var simbolo = "";
    if (turno === "jugador1" || turno === "jugadorIndefinido") {
        simbolo = "o";
    } else if (turno === "jugador2") {
        simbolo = "x";
    }
    return simbolo;
}

function turnoPc() {
    var newCasillas = []
    for (let a = 0; a < 9; a++) {
        const element = casillas[a];
        if (element.textContent === "") {
            console.log(element)
            newCasillas.push(element);
        }
    }
    idRandom = Math.round((Math.random() * (newCasillas.length - 1)) + 0);
    console.log(idRandom)
    if (idRandom >= 0) {
        newCasillas[idRandom].textContent = "o";
        newCasillas[idRandom].onclick = function () {}
    }
}

function ganador() {
    savedID = [];
    //LINEA HORIZONTAL
    for (let y = 0; y < 3; y++) {
        contX = 0;
        contO = 0;
        savedID = []
        for (let x = 0; x < 3; x++) {
            if (matriz[x][y].textContent === "x") {
                contX++;
                id = y*3+x;
                guardarID(id);
            } else if (matriz[x][y].textContent === "o") {
                contO++;
                id = y*3+x;
                guardarID(id);
            }
        }
        if (gano(contX, contO)) {
            return true;
        }
    }
    //LINEA VERTICAL
    for (let y = 0; y < 3; y++) {
        contX = 0;
        contO = 0;
        savedID = []
        for (let x = 0; x < 3; x++) {
            if (matriz[y][x].textContent === "x") {
                contX++;
                id = x*3+y;
                guardarID(id);
            } else if (matriz[y][x].textContent === "o") {
                contO++;
                id = x*3+y;
                guardarID(id);
            }
        }
        if (gano(contX, contO)) {
            return true;
        }
    }
    //DIAGONAL DERECHA IZQUIERDA
    contX = 0;
    contO = 0;
    savedID = []
    for (let a = 0; a < 3; a++) {
        if (matriz[a][a].textContent === "x") {
            contX++;
            id = a*3+a;
            guardarID(id);
        } else if (matriz[a][a].textContent === "o") {
            contO++;
            id = a*3+a;
            guardarID(id);
        }
        if (gano(contX, contO)) {
            return true;
        }
    }
    //DIAGONAL IZQUIERDA DERECHA
    contX = 0;
    contO = 0;
    savedID = []
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (x+y === 2 && matriz[x][y].textContent === "x") {
                contX++;
                id = y*3+x;
                guardarID(id);
            } else if (x+y === 2 && matriz[x][y].textContent === "o") {
                contO++;
                id = y*3+x;
                guardarID(id);
            }
        }
        if (gano(contX, contO)) {
            return true;
        }
    }
    //GANADOR
    function gano(contX, contO) {
        si = false
        if (cantJug === 1) {
            user1 = "Usuario";
            user2 = "Pc"
        } else {
            user1 = "Jugador 1";
            user2 = "Jugador 2"
        }
        if (contX === 3) {
            info.textContent = user1
            info.style.backgroundColor = "yellowgreen"
            jugadoresInfo.innerHTML = "Ganador: " + info.outerHTML;
            si = true
            bloquearCasillar()
        } else if (contO === 3) {
            info.textContent = user2
            info.style.backgroundColor = "yellowgreen"
            jugadoresInfo.innerHTML = "Ganador: " + info.outerHTML;
            si = true
            bloquearCasillar()
        }
        
        return si;
    }
    function bloquearCasillar() {
        for (let a = 0; a < casillas.length; a++) {
            casillas[a].onclick = ""
        }
        for (let a = savedID.length - 1; a > savedID.length - 4; a--) {
            const element = casillas[savedID[a]];
            element.style.color = "green"
        }
    }
    function guardarID(id) {
        savedID.push(id)
    }
    empate()
    function empate() {
        var casillasVacias = casillas.length;
        for (let a = 0; a < casillas.length; a++) {
            const element = casillas[a];
            if (element.textContent !== "") {
                casillasVacias--;
            }
        }
        console.log(casillasVacias)
        if (casillasVacias === 0) {
            info.textContent = "Empate"
            info.style.backgroundColor = "yellow"
            jugadoresInfo.innerHTML = info.outerHTML;
        }
    }
    return false;
}

