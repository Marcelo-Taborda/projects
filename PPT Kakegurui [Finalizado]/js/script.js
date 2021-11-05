var hayGanador = false;
//Funcion de inicio//
var rondas = 0;
var rondasRestantes = 0;
var ganaSiWin = 0;
function asignarRondas() {
    var cantRondas = document.getElementById("cantRondas").value;
    rondas = cantRondas;
    rondasRestantes = cantRondas;
    ganaSiWin = Math.floor(rondas/2 + 1)
    //Carta que pregunta las rondas
    document.getElementsByClassName("pregunta")[0].style.display = "none";
    //Escenario del juego
    document.getElementsByClassName("juego")[0].style.display = "flex";
    armarMazo();
    imprimirInfo();
    /* mostarCartas(mazoJug2, "cartasPc"); */
}
//Cartas al azar, emulando a los alumnos dibujando las cartas//
var mazo = [];
var mazoJug1 = [];
var mazoJug2 = [];
var cantidadCartas = 21;
var valoresCartas = ["piedra", "papel", "tijeras"];
function armarMazo() {
    if (!hayGanador) {
        mazo = [];
        mazoJug1 = [];
        mazoJug2 = [];
        for (let a = 0; a < cantidadCartas; a++) {
            mazo.push(valoresCartas[numAleatorio(0, valoresCartas.length - 1)]);
        }
        repartirMazo(mazoJug1);
        repartirMazo(mazoJug2);
        mostarCartas(mazoJug1, "cartasJugador");
    }
}
//Reparto 3 cartar a cada jugador//
function repartirMazo(mazoJug) {
    for (let a = 0; a < 3; a++) {
        var aleatorio = numAleatorio(0, mazo.length - 1);
        mazoJug.push(mazo[aleatorio]);
        mazo.splice(aleatorio, 1);
    }
}
////
winJug = 0;
winPc = 0;
function imprimirInfo() {
    const infoPrincipal = document.getElementById("info");
    const puntosJug = document.getElementById("puntosJ1");
    const puntosPc = document.getElementById("puntosJ2");
    if (!hayGanador) {
    infoPrincipal.innerText = `${rondas - rondasRestantes +  1}° RONDA de ${rondas}`;
    }
    puntosJug.innerText = `Puntos: ${winJug}/${ganaSiWin}`;
    puntosPc.innerText = `Puntos: ${winPc}/${ganaSiWin}`;
}
//cartasPc y cartasJugador
function mostarCartas(mazoDe, id) {
    if (!hayGanador) {
        /* mazoDe.every(function(v,i) { return v === mazoJug1[i] } ) */
        const cartasToShow = document.getElementsByClassName(id)[0];
        var mazoPrint = "";
        for (let a = 0; a < mazoDe.length; a++) {
            const element = mazoDe[a];
            mazoPrint += `<div onclick="compararCarta('${element}', ${a})" id="${a}"><img src="images/${element}.png"></div>`
        }
        cartasToShow.innerHTML = mazoPrint;
    }
}

function cartaDeLaPc() {
    if (!hayGanador) {
    var cartaDelPc = mazoJug2[numAleatorio(0, mazoJug2.length - 1)];
    return cartaDelPc;
    }
}

function mostrarCartaPc(cartaDelPc) {
    
        console.log("Carta de la Pc: "+cartaDelPc)
        console.log("Índice: " +mazoJug2.indexOf(cartaDelPc))
        console.log("Mazo de la pc: " + mazoJug2)
        document.getElementsByClassName("cartasPc")[0].children[mazoJug2.indexOf(cartaDelPc)].innerHTML = `<img src="images/${cartaDelPc}.png"></img>`;if (!hayGanador) {
            setTimeout(() => {
                document.getElementsByClassName("cartasPc")[0].children[mazoJug2.indexOf(cartaDelPc)].innerHTML = ``;
                mazoJug2.splice(mazoJug2.indexOf(cartaDelPc), 1);
                if (empates > 0) {
                    document.getElementsByClassName("cartasPc")[0].removeChild(document.getElementsByClassName("cartasPc")[0].children[0]);
                } else if (empates === 0 || empates === 3) {
                    document.getElementsByClassName("cartasPc")[0].innerHTML = "<div></div><div></div><div></div>"
                }
            }, 2000);
        }
}

var empates = 0;
function compararCarta(cartaDelJugador, posicion) {
    if (!hayGanador) {
        var cartaDelPc = cartaDeLaPc();
        mazoJug1.splice(posicion, 1);

        const cardsHtml = Array.from(document.getElementsByClassName("cartasJugador")[0].children);
        cardsHtml.forEach(element => {
            element.style.pointerEvents = "none";
        });
        cardsHtml[posicion].style.transform = "translateY(-75px)";

        if (cartaDelPc === cartaDelJugador) {
            empates++;
            if (empates !== 3) {
                const infoPrincipal = document.getElementById("info");
                infoPrincipal.innerText = `EMPATE`;
                ganador();
                    mostrarCartaPc(cartaDelPc)
                    setTimeout(() => {

                        imprimirInfo();
                        mostarCartas(mazoJug1, "cartasJugador");
                    }, 2000);
                
            } else {
                const infoPrincipal = document.getElementById("info");
                infoPrincipal.innerText = `EMPATE`;
                empates = 0;
                rondasRestantes--;
                ganador();
                    mostrarCartaPc(cartaDelPc)
                    setTimeout(() => {
                        imprimirInfo();
                        armarMazo();
                    }, 2000);
                
            }
        } else if ((cartaDelPc === "piedra" && cartaDelJugador === "papel") || (cartaDelPc === "papel" && cartaDelJugador === "tijeras") || (cartaDelPc === "tijeras" && cartaDelJugador === "piedra")) {
            const infoPrincipal = document.getElementById("info");
            infoPrincipal.innerText = `VICTORIA DEL USUARIO`;winJug++;ganador();
            mostrarCartaPc(cartaDelPc)
            empates = 0;
            rondasRestantes--;
            
            
                setTimeout(() => {
                   
                    armarMazo();
                    imprimirInfo();
                    mostarCartas(mazoJug1, "cartasJugador");
                }, 2000);
            
        } else if ((cartaDelJugador === "piedra" && cartaDelPc === "papel") || (cartaDelJugador === "papel" && cartaDelPc === "tijeras") || (cartaDelJugador === "tijeras" && cartaDelPc === "piedra")) {
            const infoPrincipal = document.getElementById("info");
            infoPrincipal.innerText = `DERROTA DEL USUARIO`;
            winPc++;
            ganador();
            mostrarCartaPc(cartaDelPc)
            empates = 0;
            rondasRestantes--;
            
            
                setTimeout(() => {
                    armarMazo();
                    imprimirInfo();
                    mostarCartas(mazoJug1, "cartasJugador");
                }, 2000);
            
        }
        bloquearCartas()
    }
}

function bloquearCartas() {
    var userCards = document.getElementsByClassName("cartasJugador")[0].children;
    var toArray = Array.from(userCards)
    toArray.forEach(element => {
        element.onclick = "";
    });
    console.log(toArray)
}

function ganador() {
    console.log("Winrate jug:  " + winJug)
    console.log("Winrate Pc:  " + winPc)
    console.log("Math floor: "+Math.floor(rondas/2 + 1))
    if (winPc === Math.floor(rondas/2 + 1)) {
        hayGanador = true;
    } else if (winJug === Math.floor(rondas/2 + 1)) {
        hayGanador = true;
    }
    if (winJug === Math.floor(rondas/2 + 1) && winPc === Math.floor(rondas/2 + 1)) {
        hayGanador = true;
    }
    
}











//Numero aleatorio entre un rango//
function numAleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}