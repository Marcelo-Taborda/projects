var cantidadCartas = 21;
var valoresCartas = ["piedra", "papel", "tijeras"];
var mazo = [];
var mazoJug1 = [];
var mazoJug2 = [];
var rondas = 5;
var winJug1 = 0;
var winJug2 = 0;
var empates = 0;
var rondasRestantes = 0;
var imagenes = ["piedra.png", "papel.png", "tijeras.png"];
function principal() {
    empates = 0;
    resetMazoPc();
    armarMazo();
    repartirMazo(mazoJug1);
    repartirMazo(mazoJug2);
    console.log(mazoJug1);
    console.log(mazoJug2);
    mostrarMazo();
    ganador(rondas);
}
//Realizo un mazo de 21 cartas para empezar a jugar//
function armarMazo() {
    mazoJug1 = [];
    mazoJug2 = [];
    for (let a = 0; a < cantidadCartas; a++) {
        mazo.push(valoresCartas[numAleatorio(0, valoresCartas.length - 1)]);
    }
    /* console.log(mazo); */
}
//Reparto 3 cartar a cada jugador//
function repartirMazo(mazoJug) {
    for (let a = 0; a < 3; a++) {
        var aleatorio = numAleatorio(0, mazo.length - 1);
        mazoJug.push(mazo[aleatorio]);
        mazo.splice(aleatorio, 1);
    }
}
//Devuelve un texto con las cartas de tu mazo//
function mostrarMazo() {
    const cartasJugador = document.getElementsByClassName("cartasJugador")[0];
    var mazoPrint = "";
    for (let a = 0; a < mazoJug1.length; a++) {
        const element = mazoJug1[a];
        mazoPrint += `<img src="images/${element}.png" onclick="jugada('${element}')">`
    }
    cartasJugador.innerHTML = mazoPrint;
}
//El jugador tira su carta//
function jugada(carta) {
    const cartasJug = document.getElementsByClassName("cartasJugador")[0].children;
    for (let a = 0; a < cartasJug.length; a++) {
        const element = cartasJug[a];
        element.onclick = "";
    }
    var cartaJug1 = mazoJug1[mazoJug1.indexOf(carta)];
    mazoJug1.splice(mazoJug1.indexOf(carta), 1);

    if (empates === 0 || empates === 3) {
        const cartasPc = document.getElementsByClassName("cartasPc")[0];
        var mazoPrint = "";
        for (let a = 0; a < mazoJug2.length; a++) {
            const element = mazoJug2[a];
            mazoPrint += `<div><img src="images/${element}.png"></div>`
        }
        cartasPc.innerHTML = mazoPrint;
    }

    var aleatorio = numAleatorio(0, mazoJug2.length - 1);
    var cartaJug2 = mazoJug2[aleatorio];
    mazoJug2.splice(aleatorio, 1);

    switch (cartaJug1) {
        case "piedra":
            switch (cartaJug2) {
                case "piedra":
                    alert("Empate en la ronda")
                    empates++;
                    if (empates === 3) {
                        rondasRestantes--;
                        empates = 0;
                        setTimeout(() => {
                        principal();
                    }, 3000);
                    }
                    mostrarMazo()
                    break;
                case "papel":
                    alert("Perdiste la ronda")
                    winJug2++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
                case "tijeras":
                    alert("Ganaste la ronda")
                    winJug1++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
            }
            break;
        case "papel":
            switch (cartaJug2) {
                case "piedra":
                    alert("Ganaste la ronda")
                    winJug1++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
                case "papel":
                    alert("Empate en la ronda")
                    empates++;
                    if (empates === 3) {
                        rondasRestantes--;
                        empates = 0;
                        setTimeout(() => {
                        principal();
                    }, 3000);
                    }
                    mostrarMazo()
                    break;
                case "tijeras":
                    alert("Perdiste la ronda")
                    winJug2++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
            }
            break;
        case "tijeras":
            switch (cartaJug2) {
                case "piedra":
                    alert("Perdiste la ronda")
                    winJug2++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
                case "papel":
                    alert("Ganaste la ronda")
                    winJug1++;
                    rondasRestantes--;
                    setTimeout(() => {
                        principal();
                    }, 3000);
                    break;
                case "tijeras":
                    alert("Empate en la ronda")
                    empates++;
                    if (empates === 3) {
                        rondasRestantes--;
                        empates = 0;
                        setTimeout(() => {
                        principal();
                    }, 3000);
                    }
                    mostrarMazo()
                    break;
            }
            break;
    }
}
//Determina si un jugador gano mas de la mitad de las partidas de la ronda//
function ganador(a) {
    if (winJug1 === Math.floor(rondas/2+1)) {
        alert("Ganaste la partida.");
        rondas = a;
    } else if (winJug2 === Math.floor(rondas/2+1)) {
        alert("Perdiste la partida.");
        rondas = a;
    } else if (a + 1 === rondas) {
        if (winJug1 > winJug2) {
            alert("Ganaste la partida.");
        } else if (winJug1 < winJug2) {
            alert("Perdiste la partida.");
        } else {
            alert("Empate en la partida.")
        }
    }
}
//Devuelve un numero aleatorio entre un rango//
function numAleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function asignarRondas() {
    var cantRondas = document.getElementById("cantRondas").value;
    rondas = cantRondas;
    rondasRestantes = cantRondas;
    //Carta que pregunta las rondas
    document.getElementsByClassName("pregunta")[0].style.display = "none";
    //Escenario del juego
    document.getElementsByClassName("juego")[0].style.display = "flex";
    principal();
}

function resetMazoPc() {
    const cartasPc = document.getElementsByClassName("cartasPc")[0];
    cartasPc.innerHTML = `<div></div><div></div><div></div>`;
}