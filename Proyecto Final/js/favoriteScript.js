// Favoritos //
var galeryImages = document.querySelector(".galery").querySelectorAll("img");
var favorites = [];
var favoritesNames = [];
imagenes = document.getElementsByClassName("images");
console.log(imagenes);

const loveIcon = document.querySelectorAll(".loveIcon");
Array.from(loveIcon).forEach(element => {
    element.addEventListener("click", () => {
        if (localStorage.getItem('favorites')) {
            favorites = localStorage.getItem('favorites').split(",");
            favoritesNames = localStorage.getItem('favoritesNames').split(",");
        }
        if (element.classList.contains("red")) {
            element.classList.toggle("red");
            favorites.splice(favorites.indexOf(element.parentNode.parentNode.querySelector("img").src), 1);
            favoritesNames.splice(favoritesNames.indexOf(element.parentNode.parentNode.querySelector("img").alt), 1);
            localStorage.setItem('favorites', favorites);
            localStorage.setItem('favoritesNames', favoritesNames);
        } else {
            element.classList.toggle("red");
            favorites.push(element.parentNode.parentNode.querySelector("img").src);
            favoritesNames.push(element.parentNode.parentNode.querySelector("img").alt);
            localStorage.setItem('favorites', favorites);
            localStorage.setItem('favoritesNames', favoritesNames);
        }
    });
});

if (localStorage.getItem('favorites')) {
    favorites = localStorage.getItem('favorites').split(",");
    favorites.forEach(element => {
        for (let a = 0; a < imagenes.length; a++) {
            const imagen = imagenes[a].querySelector("img");
            if (imagen.src === element) {
                imagen.parentNode.querySelector(".loveIcon").classList.add("red");
            }
        }
    });
}