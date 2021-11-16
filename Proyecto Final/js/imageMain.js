const principalIMG = document.getElementById("principalIMG");
const image = localStorage.getItem('pressIMG');
principalIMG.src = image;

const characterName = document.getElementById("characterName");
const name = localStorage.getItem('name');
characterName.textContent = name;
principalIMG.alt = name;

const pageTitle = document.getElementById("pageTitle");
pageTitle.textContent = "Personaje - " + localStorage.getItem('name');

const downloadButton = document.getElementById("download");
downloadButton.href = image;
downloadButton.download = "Personaje - " + localStorage.getItem('name');
/* const h2 = document.querySelector("h2");
const newWidth = document.querySelector("img").clientWidth;
console.log(newWidth);
h2.style.setProperty('width', newWidth); */
