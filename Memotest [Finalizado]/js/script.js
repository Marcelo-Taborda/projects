function memotest() {
    const images = ["01.jpg", "02.jpg", "03.png", "04.png", "05.jpg", "06.jpg", "07.jpeg", "08.jpeg", "09.jpg", "10.jpg", "12.jpg", "14.png", "15.jpg", "16.png"];
    var id = 0;
    for (let a = 0; a < 14; a++) {
        const article = document.createElement("article");
        document.getElementById("principal").appendChild(article);
        article.style.height = article.clientWidth + "px";
        article.innerHTML = "<img id='"+ id +"'"+" draggable='false' src='images/" + images[a] + "' onclick = 'indice("+a+", "+id+")'/>";
        id++;
        /* alert("images/" + images[a]) */
    }
    for (let a = 0; a < 14; a++) {
        const article = document.createElement("article");
        document.getElementById("principal").appendChild(article);
        article.style.height = article.clientWidth + "px";
        article.innerHTML = "<img id='"+ id +"'"+" draggable='false' src='images/" + images[a] + "' onclick = 'indice("+a+", "+id+")'/>";
        id++;
        /* alert("images/" + images[a]) */
    }
    var ul = document.querySelector('div');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

function ajustarImagenes() {
    const articleHeight = document.querySelectorAll("article")
    console.log(articleHeight)
    for (let a = 0; a < articleHeight.length; a++) {
        articleHeight[a].style.height = articleHeight[1].clientWidth + "px";
    }
}

window.addEventListener('resize', ajustarImagenes);

var intentoID = []
function indice(num, id) {
    document.getElementById(id).style.opacity = "1";
    intentoID.push(num)
    intentoID.push(id)
    if (intentoID[3] === intentoID[1]) {
        intentoID.pop();
        intentoID.pop();
    } else {
        if (intentoID.length === 4) {
            if (intentoID[0] === intentoID[2]) {
                document.querySelector("h2").innerHTML ="PERFECTO"
                document.querySelector("h2").style.color = "green"
                document.getElementById(intentoID[1]).style.border = "3px solid green";
                document.getElementById(intentoID[3]).style.border = "3px solid green";
                document.getElementById(intentoID[1]).onclick = "";
                document.getElementById(intentoID[3]).onclick = "";
                intentoID = [];
                movimientos();
                juegoCompletado();
            } else if (intentoID[0] !== intentoID[2]) {
                document.querySelector("h2").innerHTML ="CASI"
                document.querySelector("h2").style.color = "red"
                document.getElementById(intentoID[1]).style.border = "3px solid red";
                document.getElementById(intentoID[3]).style.border = "3px solid red";
                movimientos();
                puntuacion();
            }
        } else if (intentoID.length > 4) {
            document.getElementById(intentoID[1]).style.border = "0px solid red";
            document.getElementById(intentoID[3]).style.border = "0px solid red";
            document.getElementById(intentoID[1]).style.opacity = "0";
            document.getElementById(intentoID[3]).style.opacity = "0";
            intentoID = []
            document.querySelector("h2").innerHTML ="ENCUENTRA LAS IMAGENES IGUALES"
            document.querySelector("h2").style.color = "#1c1c1c"
            intentoID.push(num)
            intentoID.push(id)
            document.getElementById(id).style.opacity = "1";
        } else {
            document.querySelector("h2").innerHTML ="ENCUENTRA LAS IMAGENES IGUALES";
            document.querySelector("h2").style.color = "#1c1c1c";
        }
    }
    console.log(intentoID)
}

var puntos = 10000;
function puntuacion() {
    puntos = puntos - 250;
    if (puntos <= 0) {
        puntos = 0;
    }
    document.getElementById("puntuacion").innerHTML = "Puntuación: " + puntos;
}

var intento = 0;
function movimientos() {
    intento++;
    document.getElementById("intentos").innerHTML = "Intentos: " + intento;
}

var jugadasCorrectas = 0;
function juegoCompletado() {
    jugadasCorrectas++;
    const info = document.getElementById("info");
    const hijosPrincipal = document.getElementById("principal").children;
    divicion = hijosPrincipal.length/2;
    console.log("JugCor: " + jugadasCorrectas + ". Divicion: " + divicion + ".")
    if (jugadasCorrectas === hijosPrincipal.length/2) {
        info.innerHTML = "¡FELICITACIONES!";
        info.style.backgroundColor = "yellowgreen";
    }
}