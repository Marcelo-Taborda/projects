const cyanI = '<div class="squareCyan"></div>';
const blueJ = '<div class="squareBlue"></div>';
const orangeL = '<div class="squareOrange"></div>';
const yellowO = '<div class="squareYellow"></div>';
const greenS = '<div class="squareGreen"></div>';
const violetT = '<div class="squareViolet"></div>';
const redZ = '<div class="squareRed"></div>';

const tetrisContainer = document.getElementsByClassName("tetrisContainer")[0].children;

const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
var lastPiece = ["I"];

defineNextPiece();
function defineNextPiece() {
    if (lastPiece.length === 9) {
        lastPiece.push(pieces[aleatorio(0, lastPiece.length - 1)]);
    } else if (lastPiece.length === 0) {
        for (let a = 0; a < 10; a++) {
            indiceAleatorio = aleatorio(0, pieces.length - 1);
            lastPiece.push(pieces[indiceAleatorio]);
        }
    }
    console.log("Piezas aleatoreas: " + lastPiece);
    matriz = matrizConstructor();
    playPiece(lastPiece[0]);
}

var matriz = [];
function matrizConstructor() {
    let matriz = [];
    for (let x = 0; x < 10; x++) {
        var ejeY = [];
        for (let y = 0; y < 20; y++) {
            ejeY.push(tetrisContainer[y*10 + x])
        }
        matriz.push(ejeY);
    }
    return matriz;
}

function playPiece(piece) {
    switch (piece) {
        case "I":
            console.log(matriz)
            cyanIPiece(matriz);
            break;
        case "J":
        
            break;
        case "L":
            
            break;
        case "O":
            
            break;
        case "S":
            
            break;
        case "T":
            
            break;
        case "Z":
            
            break;
    }
}

var IPiece = [];
var order = [3, 4, 5, 6];
function cyanIPiece(matriz) {
    var y = 0
    var intervalo = setInterval(() => {
        if (IPiece.length === 4) {
            for (let b = 0; b < 4; b++) {
                const element = IPiece[b];
                element.innerHTML = "";
            }
            IPiece = [];
            /* order = []; */
        }
        if (y === 19) {
            clearInterval(intervalo);
        }
        
        for (let a = 0; a < 4; a++) {
            const element = matriz[order[0] + a][y];
            element.innerHTML = cyanI;
            IPiece[a] = element;
            /* order[a] = (order[0] + a) + (y) * 10; */
        }

        
        console.log(y)
        y++;
    }, 1000);
}

window.addEventListener("keydown", (e) => {
    matriz = matrizConstructor();
    if (e.key === "ArrowRight") {
        for (let b = 0; b < 4; b++) {
            const element = IPiece[b];
            element.innerHTML = "";
        }
        for (let a = 0; a < IPiece.length; a++) {
            const element = matriz[order[a] % 10 + 1][Math.trunc(order[a] / 10)];
            element.innerHTML = cyanI;
            IPiece[a] = element;
            order[a] = (order[a] % 10) + (Math.trunc(order[a] / 10)) * 10;
        }
    }
  });

function aleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}