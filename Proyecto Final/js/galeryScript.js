var columnas = getComputedStyle(document.documentElement).getPropertyValue("--columnas");
var imagenes = document.getElementsByClassName("images");
const contenedor = document.getElementById("galery");

function ordenarImagenes(columnas, contenedor, imagenes) {
    for (let a = 0; a < columnas; a++) {
        const newColumna = document.createElement("div");
        newColumna.id = `columna${a}`;
        newColumna.className = "columna";
        contenedor.appendChild(newColumna);
    }
    for (let a = 0; a < imagenes.length; a++) {
        document.getElementById(`columna${alturaMinima(columnas)}`).appendChild(imagenes[0]);
    }
}

function alturaMinima(columnas) {
    var alturaColumnas = [];
    for (let a = 0; a < columnas; a++) {
        alturaColumnas[a] = a;
    }
    for (let a = 0; a < columnas; a++) {
        var columna = document.getElementById(`columna${a}`).children;
        for (let b = 0; b < columna.length; b++) {
            const element = columna[b];
            alturaColumnas[a] = alturaColumnas[a] + element.clientHeight + 10;
        }
    }
    var indiceDelMinimo = -1;
    for (let a = 0; a < alturaColumnas.length; a++) {
        const element = alturaColumnas[a];
        if (element === Math.min(...alturaColumnas)) {
            indiceDelMinimo = a;
        }
    }
    return indiceDelMinimo;
}

window.onresize = () => {
    if (getComputedStyle(document.documentElement).getPropertyValue("--columnas") !== columnas) {
        var newColumnas = getComputedStyle(document.documentElement).getPropertyValue("--columnas");
        Array.from(imagenes).forEach(imagen => contenedor.appendChild(imagen));
        var newImagenes = document.getElementsByClassName("images");
        document.querySelectorAll("div.columna").forEach(div => div.remove());
        ordenarImagenes(newColumnas, contenedor, newImagenes);
        columnas = getComputedStyle(document.documentElement).getPropertyValue("--columnas");
    }
}

ordenarImagenes(columnas, contenedor, imagenes);

// VER IMAGEN //
const images = document.querySelectorAll("img");

images.forEach(image => {
    image.addEventListener("click", () => {
        localStorage.setItem('pressIMG', image.src);
        localStorage.setItem('name', image.alt);
        window.location.href = "image.html";
    });
});

