const columnas = getComputedStyle(document.documentElement).getPropertyValue("--columnas");
const imagenes = document.getElementsByClassName("images");
const contenedor = document.getElementById("galery");

function alCargar() {
    ordenarImagenes(columnas, contenedor, imagenes);
}

function ordenarImagenes(columnas, contenedor, imagenes) {
    console.log(contenedor);
    for (let a = 0; a < columnas; a++) {
        const newColumna = document.createElement("div");
        newColumna.id = `columna${a}`;
        contenedor.appendChild(newColumna);
    }
    for (let a = 0; a < imagenes.length; a++) {
        document.getElementById(`columna${alturaMinima(columnas)}`).appendChild(imagenes[0])
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
